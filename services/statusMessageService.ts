export function getStatusMessage(
  status: string
): string {

  switch (status) {

    case "requested":

      return "Your redemption request has been received and is awaiting operational review.";

    case "approved":

      return "Your redemption request has been approved by the operations team.";

    case "processing":

      return "Gold coin preparation and operational processing are currently in progress.";

    case "dispatched":

      return "Your redemption package has been dispatched for delivery.";

    case "delivered":

      return "Redemption delivery completed successfully.";

    case "rejected":

      return "Your redemption request could not be approved during operational review.";

    default:

      return "Redemption status currently unavailable.";
  }
}