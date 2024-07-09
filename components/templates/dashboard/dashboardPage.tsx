"use client";
import BATTERIES, { Battery } from "@/components/devices/batteries";
import { useState } from "react";

interface DashboardPageProps {}

interface SelectedBatteries {
  id: number;
  quantity: number;
}

const DashboardPage = (props: DashboardPageProps) => {
  const {} = props;
  const [selectedBatteries, setSelectedBatteries] = useState<
    SelectedBatteries[]
  >([
    {
      id: 1,
      quantity: 0,
    },
    {
      id: 2,
      quantity: 0,
    },
    {
      id: 3,
      quantity: 0,
    },
    {
      id: 4,
      quantity: 0,
    },
    {
      id: 5,
      quantity: 0,
    },
  ]);

  const calculateLandDimension = () => {
    const totalWidth = selectedBatteries.reduce(
      (acc, selectedBattery) =>
        acc +
        BATTERIES.find((battery) => battery.id === selectedBattery.id)!.width *
          selectedBattery.quantity,
      0
    );

    const height = Math.ceil(totalWidth / 100) * 10;
    const width = totalWidth > 100 ? 100 : totalWidth;

    return `${width} ft x ${height} ft`;
  };

  const generateBatteryLayout = (selectedBatteries: SelectedBatteries[]) => {
    // Create a map to get battery details by id
    const batteryMap = new Map<number, Battery>(
      BATTERIES.map((battery) => [battery.id, battery])
    );

    // Flatten the list of selected batteries into individual battery units
    let batteryUnits: Battery[] = [];
    selectedBatteries.forEach((selectedBattery) => {
      const battery = batteryMap.get(selectedBattery.id);
      if (battery) {
        for (let i = 0; i < selectedBattery.quantity; i++) {
          batteryUnits.push(battery);
        }
      }
    });

    // Sort the batteries by width in descending order to prioritize larger batteries
    batteryUnits.sort((a, b) => b.width - a.width);

    let layoutRows: JSX.Element[][] = [];
    let currentRow: JSX.Element[] = [];
    let currentRowWidth = 0;

    while (batteryUnits.length > 0) {
      let addedToRow = false;
      for (let i = 0; i < batteryUnits.length; i++) {
        const battery = batteryUnits[i];
        if (currentRowWidth + battery.width <= 100) {
          currentRow.push(
            <div
              key={`${battery.id}-${currentRow.length}`}
              className={`col-span-${
                battery.width / 10
              } bg-gray-300 rounded-sm w-full h-8 items-center flex justify-center text-sm`}
            >
              {battery.shortName}
            </div>
          );
          currentRowWidth += battery.width;
          batteryUnits.splice(i, 1); // Remove the battery from the list
          addedToRow = true;
          break; // Exit the loop to start checking from the largest battery again
        }
      }

      if (!addedToRow) {
        // No battery could fit in the current row, start a new row
        layoutRows.push(currentRow);
        currentRow = [];
        currentRowWidth = 0;
      }
    }

    if (currentRow.length > 0) {
      layoutRows.push(currentRow);
    }

    return (
      <div className="flex flex-col space-y-4">
        {layoutRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-10 gap-4">
            {row}
          </div>
        ))}
      </div>
    );
  };

  const batteryCount = selectedBatteries
    .filter((selectedBattery) => selectedBattery.id !== 5)
    .reduce((acc, selectedBattery) => acc + selectedBattery.quantity, 0);

  const transformerCount =
    selectedBatteries.find((selectedBattery) => selectedBattery.id === 5)
      ?.quantity || 0;

  const requiredTransformers = Math.floor(batteryCount / 2);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="grid grid-cols-8 gap-16">
        <div className="flex flex-col space-y-4 col-span-3">
          <div className="w-full flex justify-between items-center text-sm">
            <h2 className="text-2xl font-bold">Battery Selection</h2>
            <button
              className="underline"
              onClick={() => {
                setSelectedBatteries((prev) => {
                  return prev.map((selectedBattery) => ({
                    ...selectedBattery,
                    quantity: 0,
                  }));
                });
              }}
            >
              Clear All
            </button>
          </div>

          <div className="w-full rounded-lg space-y-4">
            {BATTERIES.map((battery) => (
              <div key={battery.id} className="flex w-full justify-between">
                <div className="flex flex-col">
                  <div className="w-full flex items-center space-x-2">
                    <p className="font-bold">{battery.name}</p>
                    {battery.id === 5 &&
                      transformerCount < requiredTransformers && (
                        <p className="text-sm text-red-500">
                          ({requiredTransformers} total required)
                        </p>
                      )}
                  </div>

                  <div className="flex flex-wrap gap-1 text-gray-600 text-sm items-center">
                    <p>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(battery.cost)}
                    </p>
                    <p>•</p>
                    <p>
                      {battery.width} ft x {battery.height} ft
                    </p>
                    <p>•</p>
                    <p>{battery.energy} MWh</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      selectedBatteries.find(
                        (selectedBattery) => selectedBattery.id === battery.id
                      )?.quantity || 0
                    }
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSelectedBatteries((prev) => {
                        const newSelectedBatteries = [...prev];
                        const index = newSelectedBatteries.findIndex(
                          (selectedBattery) => selectedBattery.id === battery.id
                        );
                        newSelectedBatteries[index] = {
                          id: battery.id,
                          quantity: value,
                        };
                        return newSelectedBatteries;
                      });
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 w-16"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4 col-span-5">
          <h2 className="text-2xl font-bold">Mockup</h2>
          <div className="w-full flex flex-col space-y-4 col-span-5">
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-gray-300 rounded-lg p-4 flex flex-col col-span-1 space-y-2">
                <div className="flex w-full justify-between text-sm">
                  <p>Budget</p>
                  <p>💵</p>
                </div>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    selectedBatteries.length > 0
                      ? selectedBatteries.reduce(
                          (acc, selectedBattery) =>
                            acc +
                            BATTERIES.find(
                              (battery) => battery.id === selectedBattery.id
                            )!.cost *
                              selectedBattery.quantity,
                          0
                        )
                      : 0
                  )}
                </h3>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 flex flex-col col-span-1 space-y-2">
                <div className="flex w-full justify-between text-sm">
                  <p>Land Dimension</p>
                  <p>w x h</p>
                </div>{" "}
                <h3 className="text-2xl font-bold">
                  {calculateLandDimension()}
                </h3>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 flex flex-col col-span-1 space-y-2">
                <div className="flex w-full justify-between text-sm">
                  <p>Energy Density</p>
                  <p>⚡</p>
                </div>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(
                    selectedBatteries.length > 0
                      ? selectedBatteries.reduce(
                          (acc, selectedBattery) =>
                            acc +
                            BATTERIES.find(
                              (battery) => battery.id === selectedBattery.id
                            )!.energy *
                              selectedBattery.quantity,
                          0
                        )
                      : 0
                  )}{" "}
                  MWh
                </h3>
              </div>
            </div>
            <div className="w-full border border-gray-300 rounded-lg p-4 space-y-4">
              <div className="w-full flex justify-between items-center text-sm">
                <h3>Example Layout</h3>
              </div>
              {generateBatteryLayout(selectedBatteries)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
