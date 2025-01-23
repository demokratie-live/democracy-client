import { ListType } from "../__generated__/graphql";

export type AppRoutes = {
  // Define the procedures route with legislature period and list type
  "/(sidebar)/[legislaturePeriod]/procedures": {
    legislaturePeriod: string;
    list: ListType;
  };

  // Define the procedure detail route
  "/procedures/[id]": {
    id: string;
    title?: string;
  };
};

// Make types available for expo-router
declare global {
  namespace ReactNavigation {
    interface TypedRoutes extends AppRoutes {}
  }
}

// Helper type to extract params from a route
export type RouteParams<T extends keyof AppRoutes> = AppRoutes[T];
