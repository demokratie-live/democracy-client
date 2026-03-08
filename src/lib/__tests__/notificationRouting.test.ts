/// <reference types="jest" />
import {
  applyNotificationRoute,
  attachNotificationE2EMarker,
  resolveNotificationRoute,
} from "../notificationRouting";
import { NotificationRouter } from "../../types/pushNotification";

const LP = "21";

describe("resolveNotificationRoute", () => {
  describe("top100", () => {
    it("with procedureId → listAndDetail pointing to Top100", () => {
      const result = resolveNotificationRoute(
        { category: "top100", procedureId: "21-12345" },
        LP,
      );
      expect(result).toEqual({
        kind: "listAndDetail",
        listRoute: "/(sidebar)/21/Procedures/Top100",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("without procedureId → list only (Top100)", () => {
      const result = resolveNotificationRoute({ category: "top100" }, LP);
      expect(result).toEqual({
        kind: "list",
        listRoute: "/(sidebar)/21/Procedures/Top100",
      });
    });
  });

  describe("conferenceWeek", () => {
    it("with procedureId (bulk, irrelevant) → list only (Sitzungswoche)", () => {
      const result = resolveNotificationRoute(
        { category: "conferenceWeek", procedureId: "21-99999" },
        LP,
      );
      expect(result).toEqual({
        kind: "list",
        listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
      });
    });

    it("without procedureId → list only (Sitzungswoche)", () => {
      const result = resolveNotificationRoute(
        { category: "conferenceWeek" },
        LP,
      );
      expect(result).toEqual({
        kind: "list",
        listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
      });
    });
  });

  describe("conferenceWeekVote", () => {
    it("with procedureId → listAndDetail pointing to Sitzungswoche", () => {
      const result = resolveNotificationRoute(
        { category: "conferenceWeekVote", procedureId: "21-12345" },
        LP,
      );
      expect(result).toEqual({
        kind: "listAndDetail",
        listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("without procedureId → list only (Sitzungswoche)", () => {
      const result = resolveNotificationRoute(
        { category: "conferenceWeekVote" },
        LP,
      );
      expect(result).toEqual({
        kind: "list",
        listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
      });
    });
  });

  describe("outcome", () => {
    it("with procedureId → detail only", () => {
      const result = resolveNotificationRoute(
        { category: "outcome", procedureId: "21-12345" },
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("without procedureId → null", () => {
      const result = resolveNotificationRoute({ category: "outcome" }, LP);
      expect(result).toBeNull();
    });
  });

  describe("fallback (no/unknown category)", () => {
    it("with procedureId → detail only", () => {
      const result = resolveNotificationRoute(
        { procedureId: "21-12345" },
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("empty payload → null", () => {
      const result = resolveNotificationRoute({}, LP);
      expect(result).toBeNull();
    });
  });

  describe("legislaturePeriod propagation", () => {
    it.each(["19", "20", "21"])(
      "uses correct legislaturePeriod=%s in routes",
      (lp) => {
        const result = resolveNotificationRoute({ category: "top100" }, lp);
        expect(result).toEqual({
          kind: "list",
          listRoute: `/(sidebar)/${lp}/Procedures/Top100`,
        });
      },
    );
  });
});

describe("applyNotificationRoute", () => {
  let router: NotificationRouter;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
      push: jest.fn(),
    };
  });

  it("navigates to the list for list routes", () => {
    applyNotificationRoute(router, {
      kind: "list",
      listRoute: "/(sidebar)/21/Procedures/Top100",
    });

    expect(router.navigate).toHaveBeenCalledWith("/(sidebar)/21/Procedures/Top100");
    expect(router.push).not.toHaveBeenCalled();
  });

  it("opens the list first and then pushes the detail route", () => {
    applyNotificationRoute(router, {
      kind: "listAndDetail",
      listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
      detailRoute: "/procedure/21-12345",
    });

    expect(router.navigate).toHaveBeenCalledWith(
      "/(sidebar)/21/Procedures/Sitzungswoche",
    );
    expect(router.push).toHaveBeenCalledWith("/procedure/21-12345");
    expect((router.navigate as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
      (router.push as jest.Mock).mock.invocationCallOrder[0],
    );
  });

  it("uses the provided scheduler for list-and-detail routes", () => {
    const schedule = jest.fn((task: () => void) => {
      task();
    });

    applyNotificationRoute(
      {
        ...router,
        schedule,
      },
      {
        kind: "listAndDetail",
        listRoute: "/(sidebar)/21/Procedures/Top100",
        detailRoute: "/procedure/21-12345",
      },
    );

    expect(schedule).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith("/(sidebar)/21/Procedures/Top100");
    expect(router.push).toHaveBeenCalledWith("/procedure/21-12345");
  });

  it("pushes the detail route for detail-only notifications", () => {
    applyNotificationRoute(router, {
      kind: "detail",
      detailRoute: "/procedure/21-12345",
    });

    expect(router.navigate).not.toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/procedure/21-12345");
  });
});

describe("attachNotificationE2EMarker", () => {
  it("adds the marker to list-only routes", () => {
    expect(
      attachNotificationE2EMarker(
        {
          kind: "list",
          listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
        },
        "notification-conference-week",
      ),
    ).toEqual({
      kind: "list",
      listRoute:
        "/(sidebar)/21/Procedures/Sitzungswoche?e2e=notification-conference-week",
    });
  });

  it("adds the marker only to the detail route for list-and-detail notifications", () => {
    expect(
      attachNotificationE2EMarker(
        {
          kind: "listAndDetail",
          listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
          detailRoute: "/procedure/21-12345",
        },
        "notification-sitzungswoche-vote",
      ),
    ).toEqual({
      kind: "listAndDetail",
      listRoute: "/(sidebar)/21/Procedures/Sitzungswoche",
      detailRoute:
        "/procedure/21-12345?e2e=notification-sitzungswoche-vote",
    });
  });

  it("adds the marker to detail-only routes", () => {
    expect(
      attachNotificationE2EMarker(
        {
          kind: "detail",
          detailRoute: "/procedure/21-12345",
        },
        "deeplink",
      ),
    ).toEqual({
      kind: "detail",
      detailRoute: "/procedure/21-12345?e2e=deeplink",
    });
  });
});
