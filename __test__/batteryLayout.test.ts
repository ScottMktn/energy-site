import { Battery } from "@/components/devices/batteries";
import { SelectedBatteries } from "@/components/templates/dashboard/dashboardPage";
import { calculateTotalBudget } from "@/utils/helpers/calculateBudget";
import { calculateTotalDimensions } from "@/utils/helpers/calculateDimensions";
import { calculateTotalEnergy } from "@/utils/helpers/calculateEnergy";
import { updateBatteries } from "@/utils/helpers/updateBatteries";

describe("batteryLayout", () => {
  const BATTERIES: Battery[] = [
    {
      id: 1,
      name: "Battery A",
      width: 10,
      height: 10,
      cost: 100,
      energy: 50,
      releaseDate: "2022-01-01",
      shortName: "A",
    },
    {
      id: 2,
      name: "Battery B",
      width: 20,
      height: 10,
      cost: 200,
      energy: 100,
      releaseDate: "2022-02-01",
      shortName: "B",
    },
  ];

  describe("calculateBudget", () => {
    it("should correctly calculate the total cost of selected batteries", () => {
      const selectedBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 4 },
      ];

      const result = calculateTotalBudget(selectedBatteries, BATTERIES);

      expect(result).toBe("$1,000.00");
    });

    it("should handle no selected batteries", () => {
      const selectedBatteries: SelectedBatteries[] = [];

      const result = calculateTotalBudget(selectedBatteries, BATTERIES);

      expect(result).toBe("$0.00");
    });
  });

  describe("calculateEnergy", () => {
    it("should correctly calculate the total energy of selected batteries", () => {
      const selectedBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 4 },
      ];

      const result = calculateTotalEnergy(selectedBatteries, BATTERIES);

      expect(result).toBe("500.00");
    });

    it("should handle no selected batteries", () => {
      const selectedBatteries: SelectedBatteries[] = [];

      const result = calculateTotalEnergy(selectedBatteries, BATTERIES);

      expect(result).toBe("0.00");
    });
  });

  describe("calculateTotalDimensions", () => {
    it("should correctly calculate total width and height for selected batteries at 100m", () => {
      const selectedBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 4 },
      ];

      const result = calculateTotalDimensions(selectedBatteries, BATTERIES);

      expect(result.width).toBe(100);
      expect(result.height).toBe(10);
    });

    it("should correctly calculate total width and height for selected batteries over 100m", () => {
      const selectedBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 5 },
        { id: 2, quantity: 5 },
      ];

      const result = calculateTotalDimensions(selectedBatteries, BATTERIES);

      expect(result.width).toBe(100);
      expect(result.height).toBe(20);
    });

    it("should handle no selected batteries", () => {
      const selectedBatteries: SelectedBatteries[] = [];

      const result = calculateTotalDimensions(selectedBatteries, BATTERIES);

      expect(result.width).toBe(0);
      expect(result.height).toBe(0);
    });

    it("should handle selected batteries that do not exceed width 100m", () => {
      const selectedBatteries: SelectedBatteries[] = [{ id: 1, quantity: 1 }];

      const result = calculateTotalDimensions(selectedBatteries, BATTERIES);

      expect(result.width).toBe(10);
      expect(result.height).toBe(10);
    });
  });

  describe("updateBatteries", () => {
    it("should not add 1 transformer when 1 batteries is added", () => {
      const initialBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 0 },
        { id: 2, quantity: 0 },
        { id: 3, quantity: 0 },
        { id: 4, quantity: 0 },
        { id: 5, quantity: 0 },
      ];

      const updatedBatteries = updateBatteries(initialBatteries, 1, 1);

      expect(
        updatedBatteries.find((battery) => battery.id === 1)?.quantity
      ).toBe(1);
      expect(
        updatedBatteries.find((battery) => battery.id === 5)?.quantity
      ).toBe(0);
    });
    it("should automatically add 1 transformer when 2 batteries are added", () => {
      const initialBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 0 },
        { id: 2, quantity: 0 },
        { id: 3, quantity: 0 },
        { id: 4, quantity: 0 },
        { id: 5, quantity: 0 },
      ];

      const updatedBatteries = updateBatteries(initialBatteries, 1, 2);

      expect(
        updatedBatteries.find((battery) => battery.id === 1)?.quantity
      ).toBe(2);
      expect(
        updatedBatteries.find((battery) => battery.id === 5)?.quantity
      ).toBe(1);
    });

    it("should not add extra transformers if already sufficient", () => {
      const initialBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 0 },
        { id: 2, quantity: 0 },
        { id: 3, quantity: 0 },
        { id: 4, quantity: 0 },
        { id: 5, quantity: 2 },
      ];

      const updatedBatteries = updateBatteries(initialBatteries, 1, 4);

      expect(
        updatedBatteries.find((battery) => battery.id === 1)?.quantity
      ).toBe(4);
      expect(
        updatedBatteries.find((battery) => battery.id === 5)?.quantity
      ).toBe(2);
    });

    it("should handle no selected batteries correctly", () => {
      const initialBatteries: SelectedBatteries[] = [
        { id: 1, quantity: 0 },
        { id: 2, quantity: 0 },
        { id: 3, quantity: 0 },
        { id: 4, quantity: 0 },
        { id: 5, quantity: 0 },
      ];

      const updatedBatteries = updateBatteries(initialBatteries, 1, 0);

      expect(
        updatedBatteries.find((battery) => battery.id === 1)?.quantity
      ).toBe(0);
      expect(
        updatedBatteries.find((battery) => battery.id === 5)?.quantity
      ).toBe(0);
    });
  });
});
