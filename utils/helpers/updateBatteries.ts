// utils/helpers/updateBatteries.ts
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";

export function getRequiredTransformers(
  selectedBatteries: SelectedBatteries[]
) {
  const batteryCount = selectedBatteries.filter(
    (selectedBattery) => selectedBattery.id !== 5
  );

  const requiredTransformers = Math.floor(
    batteryCount.reduce(
      (acc, selectedBattery) => acc + selectedBattery.quantity,
      0
    ) / 2
  );

  return requiredTransformers;
}

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

  const transformerCount =
    newSelectedBatteries.find((selectedBattery) => selectedBattery.id === 5)
      ?.quantity || 0;

  const requiredTransformers = getRequiredTransformers(newSelectedBatteries);

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
