interface RedemptionRequest {

  grams: number;

  status: string;
}

export function getAdminAnalytics(
  requests: RedemptionRequest[]
) {

  const totalRequests =
    requests.length;

  const totalGoldRequested =
    requests.reduce(
      (sum, item) =>
        sum + item.grams,
      0
    );

  const deliveredCount =
    requests.filter(
      (item) =>
        item.status ===
        "delivered"
    ).length;

  const pendingCount =
    requests.filter(
      (item) =>
        item.status !==
          "delivered" &&
        item.status !==
          "rejected"
    ).length;

  return {

    totalRequests,

    totalGoldRequested,

    deliveredCount,

    pendingCount,
  };
}