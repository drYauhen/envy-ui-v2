const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3001/graphql';

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}

// Query для получения навигации
export const GET_NAVIGATION = `
  query GetNavigation {
    navigation {
      key
      title
      orderIndex
      items {
        id
        key
        label
        icon
        badge
        routePath
        isActive
        isDisabled
        orderIndex
      }
    }
  }
`;

// Mutation для обновления элемента
export const UPDATE_NAVIGATION_ITEM = `
  mutation UpdateNavigationItem($id: Int!, $label: String, $icon: String, $badge: String) {
    updateNavigationItem(id: $id, label: $label, icon: $icon, badge: $badge) {
      id
      key
      label
      icon
      badge
    }
  }
`;

export interface NavigationSection {
  key: string;
  title?: string;
  orderIndex: number;
  items: NavigationItem[];
}

export interface NavigationItem {
  id: number;
  key: string;
  label: string;
  icon?: string;
  badge?: string;
  routePath?: string;
  isActive: boolean;
  isDisabled: boolean;
  orderIndex: number;
}

export async function getNavigation(): Promise<NavigationSection[]> {
  const data = await graphqlRequest<{ navigation: NavigationSection[] }>(GET_NAVIGATION);
  return data.navigation;
}

export async function updateNavigationItem(
  id: number,
  updates: { label?: string; icon?: string; badge?: string }
) {
  const data = await graphqlRequest<{ updateNavigationItem: NavigationItem }>(
    UPDATE_NAVIGATION_ITEM,
    { id, ...updates }
  );
  return data.updateNavigationItem;
}

