import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } from 'graphql';
import { getDatabase, sectionQueries, itemQueries, pageContentQueries } from '../db/database.js';

// Navigation Item Type
const NavigationItemType = new GraphQLObjectType({
  name: 'NavigationItem',
  fields: {
    id: { type: GraphQLInt },
    key: { type: GraphQLString },
    label: { type: GraphQLString },
    icon: { type: GraphQLString },
    badge: { type: GraphQLString },
    routePath: { type: GraphQLString },
    isActive: { 
      type: GraphQLBoolean,
      resolve: (parent) => {
        // SQLite возвращает boolean как числа (0/1), преобразуем в boolean
        return parent.is_active === 1 || parent.is_active === true;
      },
    },
    isDisabled: { 
      type: GraphQLBoolean,
      resolve: (parent) => {
        // SQLite возвращает boolean как числа (0/1), преобразуем в boolean
        return parent.is_disabled === 1 || parent.is_disabled === true;
      },
    },
    orderIndex: { 
      type: GraphQLInt,
      resolve: (parent) => parent.order_index,
    },
  },
});

// Navigation Section Type
const NavigationSectionType = new GraphQLObjectType({
  name: 'NavigationSection',
  fields: {
    id: { type: GraphQLInt },
    key: { type: GraphQLString },
    title: { type: GraphQLString },
    orderIndex: { 
      type: GraphQLInt,
      resolve: (parent) => parent.order_index,
    },
    items: {
      type: new GraphQLList(NavigationItemType),
      resolve: (parent) => {
        const db = getDatabase();
        // Получаем все элементы, включая неактивные, чтобы клиент мог фильтровать
        return db.prepare(`
          SELECT * FROM navigation_items 
          WHERE section_key = ?
          ORDER BY order_index ASC
        `).all(parent.key);
      },
    },
  },
});

// Page Content Type
const PageContentType = new GraphQLObjectType({
  name: 'PageContent',
  fields: {
    id: { type: GraphQLInt },
    pageKey: { 
      type: GraphQLString,
      resolve: (parent) => parent.page_key,
    },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    metadata: { type: GraphQLString },
  },
});

// Query Type
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    navigation: {
      type: new GraphQLList(NavigationSectionType),
      resolve: () => {
        const db = getDatabase();
        return sectionQueries.getAll(db);
      },
    },
    navigationSection: {
      type: NavigationSectionType,
      args: {
        key: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        return sectionQueries.getByKey(db, args.key);
      },
    },
    pageContent: {
      type: PageContentType,
      args: {
        pageKey: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        return pageContentQueries.getByKey(db, args.pageKey);
      },
    },
  },
});

// Mutation Type
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createNavigationSection: {
      type: NavigationSectionType,
      args: {
        key: { type: GraphQLString },
        title: { type: GraphQLString },
        orderIndex: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        sectionQueries.create(db, args);
        return sectionQueries.getByKey(db, args.key);
      },
    },
    updateNavigationSection: {
      type: NavigationSectionType,
      args: {
        key: { type: GraphQLString },
        title: { type: GraphQLString },
        orderIndex: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        sectionQueries.update(db, args.key, args);
        return sectionQueries.getByKey(db, args.key);
      },
    },
    createNavigationItem: {
      type: NavigationItemType,
      args: {
        sectionKey: { type: GraphQLString },
        key: { type: GraphQLString },
        label: { type: GraphQLString },
        icon: { type: GraphQLString },
        badge: { type: GraphQLString },
        routePath: { type: GraphQLString },
        orderIndex: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        const result = itemQueries.create(db, args);
        return db.prepare('SELECT * FROM navigation_items WHERE id = ?').get(result.lastInsertRowid);
      },
    },
    updateNavigationItem: {
      type: NavigationItemType,
      args: {
        id: { type: GraphQLInt },
        label: { type: GraphQLString },
        icon: { type: GraphQLString },
        badge: { type: GraphQLString },
        routePath: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
        isDisabled: { type: GraphQLBoolean },
        orderIndex: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        const { id, ...updates } = args;
        itemQueries.update(db, id, updates);
        return db.prepare('SELECT * FROM navigation_items WHERE id = ?').get(id);
      },
    },
    deleteNavigationItem: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const db = getDatabase();
        const result = itemQueries.delete(db, args.id);
        return result.changes > 0;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

