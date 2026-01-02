import { initDatabase, getDatabase, sectionQueries, itemQueries, pageContentQueries } from './database.js';

const db = initDatabase();

// Проверить, есть ли уже данные
const existingSections = sectionQueries.getAll(db);
if (existingSections.length > 0) {
  console.log('⚠️  Database already has data, skipping seed');
  process.exit(0);
}

// Создать секции навигации (как в Storybook)
const sections = [
  { key: 'plans', title: 'Plans', orderIndex: 0 },
  { key: 'projects', title: 'Projects', orderIndex: 1 },
  { key: 'analytics', title: 'Analytics', orderIndex: 2 },
  { key: 'people', title: 'People', orderIndex: 3 },
];

sections.forEach(section => {
  sectionQueries.create(db, section);
});

// Создать элементы меню (как в Storybook)
const items = [
  // Plans section
  { sectionKey: 'plans', key: 'view-edit-plan', label: 'View/Edit Plan', icon: 'plan', orderIndex: 0 },
  { sectionKey: 'plans', key: 'submit-updates', label: 'Submit Updates', icon: 'submit-updates', badge: '3', orderIndex: 1 },
  { sectionKey: 'plans', key: 'reports', label: 'Reports', icon: 'plan-reports', orderIndex: 2 },
  { sectionKey: 'plans', key: 'public-dashboards', label: 'Public Dashboards', icon: 'plan-dashboards', orderIndex: 3 },
  
  // Projects section
  { sectionKey: 'projects', key: 'tasks', label: 'Tasks', icon: 'tasks', orderIndex: 0 },
  { sectionKey: 'projects', key: 'projects-planning', label: 'Projects Planning', icon: 'pencil-ruler', orderIndex: 1 },
  { sectionKey: 'projects', key: 'projects-dashboard', label: 'Projects Dashboard', icon: 'map-marked-alt', orderIndex: 2 },
  { sectionKey: 'projects', key: 'project-reports', label: 'Project Reports', icon: 'plan-reports', orderIndex: 3 },
  
  // Analytics section
  { sectionKey: 'analytics', key: 'data-sources', label: 'Data Sources', icon: 'data-source', orderIndex: 0 },
  { sectionKey: 'analytics', key: 'visuals', label: 'Visuals', icon: 'visuals', orderIndex: 1 },
  { sectionKey: 'analytics', key: 'dashboards', label: 'Dashboards', icon: 'visuals-dashboard', orderIndex: 2 },
  
  // People section
  { sectionKey: 'people', key: 'my-assessments', label: 'My Assessments', icon: 'personal-assessment', orderIndex: 0 },
  { sectionKey: 'people', key: 'team-assessments', label: 'Team Assessments', icon: 'team-assessment', orderIndex: 1 },
  { sectionKey: 'people', key: 'org-assessments', label: 'Organization Assessments', icon: 'org-assessment', orderIndex: 2 },
];

items.forEach(item => {
  itemQueries.create(db, {
    ...item,
    isActive: true,
    isDisabled: false,
  });
});

// Создать контент для каждой страницы
const pageContents = items.map(item => ({
  pageKey: item.key,
  title: item.label,
  content: `This is the content for ${item.label}. This page will be implemented in the future.`,
  metadata: JSON.stringify({
    icon: item.icon,
    sectionKey: item.sectionKey,
  }),
}));

pageContents.forEach(content => {
  pageContentQueries.create(db, content);
});

console.log('✅ Database seeded with Storybook navigation data and page content');

