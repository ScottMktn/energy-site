import { Battery } from "@/components/devices/batteries";
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";

function calculateTotalBudget(
  selectedBatteries: SelectedBatteries[],
  BATTERIES: Battery[]
) {
  const totalCost =
    selectedBatteries.length > 0
      ? selectedBatteries.reduce(
          (acc, selectedBattery) =>
            acc +
            BATTERIES.find((battery) => battery.id === selectedBattery.id)!
              .cost *
              selectedBattery.quantity,
          0
        )
      : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalCost);
}

export { calculateTotalBudget };
