import React, { useState, useEffect } from 'react';
import { styled } from '@storybook/theming';
import { Button, Checkbox, Form, Field, Loader, ListItem, Separator } from '@storybook/components';

const Container = styled.div`
  padding: 16px;
  min-height: 200px;
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.color.defaultText};
`;

const LayerList = styled.div`
  margin-bottom: 16px;
`;

const LayerItem = styled(ListItem)`
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 4px;
  background: ${props => props.selected ? props.theme.background.hoverable : 'transparent'};
`;

const LayerName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.color.defaultText};
`;

const LayerDescription = styled.div`
  font-size: 12px;
  color: ${props => props.theme.color.secondary};
  margin-top: 2px;
`;

const StatusIndicator = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${props => {
    switch (props.status) {
      case 'enabled': return '#10B981';
      case 'disabled': return '#6B7280';
      case 'generating': return '#F59E0B';
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const ConsoleOutput = styled.pre`
  background: ${props => props.theme.background.content};
  border: 1px solid ${props => props.theme.appBorderColor};
  border-radius: 4px;
  padding: 12px;
  margin-top: 16px;
  font-family: monospace;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const LayerGenerationPanel = () => {
  const [layers, setLayers] = useState({});
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [lastResult, setLastResult] = useState(null);

  // Load configuration on mount
  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      // In a real implementation, this would fetch from the server
      // For now, we'll simulate loading the config
      const response = await fetch('/layer-generation.config.json');
      const config = await response.json();

      setLayers(config.layers);
      setSelectedLayers(config.generation.selectedLayers);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      setConsoleOutput('Error loading configuration: ' + error.message);
    }
  };

  const handleLayerToggle = (layerId) => {
    setSelectedLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const handleGenerate = async () => {
    if (selectedLayers.length === 0) {
      setConsoleOutput('No layers selected for generation');
      return;
    }

    setIsGenerating(true);
    setConsoleOutput('');
    setLastResult(null);

    try {
      // Call the layer generation API
      const response = await fetch('/api/layers/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layers: selectedLayers,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setLastResult({ success: true, ...result });
        setConsoleOutput(result.output || 'Generation completed successfully');
      } else {
        setLastResult({ success: false, ...result });
        setConsoleOutput(result.error || 'Generation failed');
      }
    } catch (error) {
      setLastResult({ success: false, error: error.message });
      setConsoleOutput('Network error: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleListLayers = async () => {
    try {
      const response = await fetch('/api/layers/list');
      const result = await response.json();
      setConsoleOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setConsoleOutput('Error listing layers: ' + error.message);
    }
  };

  const getLayerStatus = (layerId) => {
    if (!lastResult) return 'unknown';

    const layerResult = lastResult.layers?.[layerId];
    if (!layerResult) return 'unknown';

    if (layerResult.success) return 'success';
    if (layerResult.error) return 'error';
    return 'unknown';
  };

  return (
    <Container>
      <Title>Layer Generation</Title>

      <Form>
        <Field label="Available Layers">
          <LayerList>
            {Object.entries(layers).map(([layerId, layer]) => (
              <LayerItem
                key={layerId}
                selected={selectedLayers.includes(layerId)}
                onClick={() => handleLayerToggle(layerId)}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={selectedLayers.includes(layerId)}
                    onChange={() => handleLayerToggle(layerId)}
                  />
                  <StatusIndicator status={layer.enabled ? 'enabled' : 'disabled'} />
                  <div>
                    <LayerName>{layer.name}</LayerName>
                    <LayerDescription>{layer.description}</LayerDescription>
                  </div>
                </div>
              </LayerItem>
            ))}
          </LayerList>
        </Field>

        <Separator />

        <ActionButtons>
          <Button
            primary
            onClick={handleGenerate}
            disabled={isGenerating || selectedLayers.length === 0}
          >
            {isGenerating ? (
              <>
                <Loader size={12} />
                Generating...
              </>
            ) : (
              `Generate Selected (${selectedLayers.length})`
            )}
          </Button>

          <Button onClick={handleListLayers}>
            List Layers
          </Button>
        </ActionButtons>

        {consoleOutput && (
          <>
            <Separator />
            <Field label="Console Output">
              <ConsoleOutput>{consoleOutput}</ConsoleOutput>
            </Field>
          </>
        )}
      </Form>
    </Container>
  );
};