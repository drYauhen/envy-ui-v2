import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export default function expressMiddleware(router) {
  // Serve the layer generation config
  router.get('/layer-generation.config.json', (req, res) => {
    try {
      const configPath = path.join(process.cwd(), 'layer-generation.config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        res.json(config);
      } else {
        res.status(404).json({ error: 'Configuration file not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // API endpoint for layer generation
  router.post('/api/layers/generate', (req, res) => {
    try {
      const { layers } = req.body;

      if (!layers || !Array.isArray(layers)) {
        return res.status(400).json({ error: 'Invalid layers parameter' });
      }

      // Build the command
      const layersArg = layers.join(',');
      const command = `npm run layers:generate -- --layers ${layersArg}`;

      console.log(`Executing: ${command}`);

      // Execute the command and capture output
      const output = execSync(command, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: 'pipe',
        env: { ...process.env, FORCE_COLOR: '0' } // Disable colors for JSON output
      });

      // Parse the output to extract results
      // This is a simplified version - in production you'd want more robust parsing
      const success = !output.includes('❌') && output.includes('🎉');
      const duration = output.match(/Total time: (\d+)ms/)?.[1] || '0';

      res.json({
        success,
        output: output.trim(),
        layers: layers.reduce((acc, layer) => {
          acc[layer] = {
            success: output.includes(`✅ Layer ${layer} generated successfully`),
            duration: parseInt(duration) / layers.length // Rough estimate
          };
          return acc;
        }, {})
      });

    } catch (error) {
      console.error('Layer generation error:', error);
      res.status(500).json({
        success: false,
        error: error.message,
        output: error.stdout || error.stderr || 'Unknown error'
      });
    }
  });

  // API endpoint for listing layers
  router.get('/api/layers/list', (req, res) => {
    try {
      const command = 'npm run layers:list';
      const output = execSync(command, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: 'pipe',
        env: { ...process.env, FORCE_COLOR: '0' }
      });

      // Parse the layers list output
      // This is a simplified parser - you might want to make it more robust
      const lines = output.split('\n').filter(line => line.trim());
      const layers = {};

      let currentLayer = null;
      for (const line of lines) {
        if (line.includes('✅') || line.includes('❌')) {
          const isEnabled = line.includes('✅');
          const layerId = line.split(' ')[1];
          if (layerId) {
            currentLayer = layerId;
            layers[layerId] = { enabled: isEnabled, dependencies: [] };
          }
        } else if (currentLayer && line.includes('Dependencies:')) {
          const deps = line.split('Dependencies:')[1]?.trim();
          if (deps && deps !== 'none') {
            layers[currentLayer].dependencies = deps.split(',').map(d => d.trim());
          }
        }
      }

      res.json({
        success: true,
        layers
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
};