// utils/helpers/updateBatteries.ts
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";

export function updateBatteries(
  selectedBatteries: SelectedBatteries[],
  batteryId: number,
  quantity: number
): SelectedBatteries[] {
  const newSelectedBatteries = [...selectedBatteries];
  const index = newSelectedBatteries.findIndex(
    (selectedBattery) => selectedBattery.id === batteryId
  );
  newSelectedBatteries[index] = {
    id: batteryId,
    quantity,
  };

  // Ensure that the transformer count is always half of the battery count
  const batteryCount = newSelectedBatteries
    .filter((selectedBattery) => selectedBattery.id !== 5)
    .reduce((acc, selectedBattery) => acc + selectedBattery.quantity, 0);

  const transformerCount =
    newSelectedBatteries.find((selectedBattery) => selectedBattery.id === 5)
      ?.quantity || 0;

  const requiredTransformers = Math.floor(batteryCount / 2);

  if (transformerCount < requiredTransformers) {
    const transformerIndex = newSelectedBatteries.findIndex(
      (selectedBattery) => selectedBattery.id === 5
    );
    newSelectedBatteries[transformerIndex] = {
      id: 5,
      quantity: requiredTransformers,
    };
  }

  return newSelectedBatteries;
}
