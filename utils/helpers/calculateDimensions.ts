import { Battery } from "@/components/devices/batteries";
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";

function calculateTotalDimensions(
  selectedBatteries: SelectedBatteries[],
  BATTERIES: Battery[]
) {
  const totalWidth = selectedBatteries.reduce(
    (acc, selectedBattery) =>
      acc +
      BATTERIES.find((battery) => battery.id === selectedBattery.id)!.width *
        selectedBattery.quantity,
    0
  );

  const height = Math.ceil(totalWidth / 100) * 10;
  const width = totalWidth > 100 ? 100 : totalWidth;

  return { width, height };
}

export { calculateTotalDimensions };
