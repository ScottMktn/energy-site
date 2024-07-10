import { Battery } from "@/components/devices/batteries";
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";

function calculateTotalEnergy(
  selectedBatteries: SelectedBatteries[],
  BATTERIES: Battery[]
) {
  const totalEnergy =
    selectedBatteries.length > 0
      ? selectedBatteries.reduce(
          (acc, selectedBattery) =>
            acc +
            BATTERIES.find((battery) => battery.id === selectedBattery.id)!
              .energy *
              selectedBattery.quantity,
          0
        )
      : 0;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(totalEnergy);
}

export { calculateTotalEnergy };
