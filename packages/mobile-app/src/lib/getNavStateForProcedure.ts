import { NavigationState, PartialState } from '@react-navigation/core';

interface Args {
  procedureId: string;
  title: string;
  list?: string;
}
export const getNavInitStateForProcedure = ({
  procedureId,
  title,
}: Args): PartialState<NavigationState> => {
  return {
    index: 0,
    routes: [
      {
        name: 'Sidebar',
        state: {
          index: 0,
          routes: [
            {
              name: 'Bundestag',
              state: {
                index: 1,
                routes: [
                  {
                    name: 'TabView',
                    state: {
                      index: 1,
                      routes: [
                        {
                          name: 'Sitzungswoche',
                          params: {
                            list: 'CONFERENCEWEEKS_PLANNED',
                          },
                        },
                        {
                          name: 'Vergangen',
                          params: {
                            list: 'PAST',
                          },
                        },
                        {
                          name: 'Top 100',
                          params: {
                            list: 'TOP100',
                          },
                        },
                        {
                          name: 'DEV',
                          params: {
                            list: 'PREPARATION',
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Procedure',
                    params: {
                      procedureId,
                      title,
                    },
                  },
                ],
              },
            },
            {
              name: 'WahlOMeter',
            },
            {
              name: 'Settings',
            },
            {
              name: 'Introduction',
              params: {},
            },
          ],
        },
      },
    ],
  };
};

export const getNavStateForProcedure = ({
  procedureId,
  title,
}: Args): PartialState<NavigationState> => {
  return {
    type: 'stack',
    index: 0,
    routes: [
      {
        name: 'Sidebar',
        state: {
          type: 'drawer',
          index: 0,
          routeNames: ['Bundestag', 'WahlOMeter', 'Settings', 'Introduction'],
          routes: [
            {
              name: 'Bundestag',
              state: {
                type: 'stack',
                routeNames: [
                  'TabView',
                  'Procedure',
                  'Voting',
                  'Filter',
                  'Search',
                ],
                index: 1,
                routes: [
                  {
                    name: 'TabView',
                    state: {
                      type: 'tab',
                      routeNames: [
                        'Sitzungswoche',
                        'Vergangen',
                        'Top 100',
                        'DEV',
                      ],
                      index: 1,
                      routes: [
                        {
                          name: 'Sitzungswoche',
                          params: {
                            list: 'CONFERENCEWEEKS_PLANNED',
                          },
                        },
                        {
                          name: 'Vergangen',
                          params: {
                            list: 'PAST',
                          },
                        },
                        {
                          name: 'Top 100',
                          params: {
                            list: 'TOP100',
                          },
                        },
                        {
                          name: 'DEV',
                          params: {
                            list: 'PREPARATION',
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: 'Procedure',
                    params: {
                      procedureId,
                      title,
                    },
                  },
                ],
              },
            },
            {
              name: 'WahlOMeter',
            },
            {
              name: 'Settings',
            },
            {
              name: 'Introduction',
              params: {},
            },
          ],
        },
      },
    ],
  };
};
