export interface Battery {
  id: number;
  name: string;
  shortName: string;
  width: number; // measured in ft
  height: number; // measured in ft
  cost: number; // measured in $
  energy: number; // measured in MWh
  releaseDate: string;
  color?: string; // hex color
}

const BATTERIES: Battery[] = [
  {
    id: 1,
    name: "MegapackXL",
    shortName: "MPXL",
    width: 40,
    height: 10,
    cost: 120000,
    energy: 4,
    releaseDate: "2022",
    color: "#EF9C66",
  },
  {
    id: 2,
    name: "Megapack2",
    shortName: "MP2",
    width: 30,
    height: 10,
    cost: 80000,
    energy: 3,
    releaseDate: "2021",
    color: "#FCDC94",
  },
  {
    id: 3,
    name: "Megapack",
    shortName: "MP",
    width: 30,
    height: 10,
    cost: 50000,
    energy: 2,
    releaseDate: "2005",
    color: "#C8CFA0",
  },
  {
    id: 4,
    name: "PowerPack",
    shortName: "PP",
    width: 10,
    height: 10,
    cost: 10000,
    energy: 1,
    releaseDate: "2000",
    color: "#78ABA8",
  },
  {
    id: 5,
    name: "Transformer",
    shortName: "TF",
    width: 10,
    height: 10,
    cost: 10000,
    energy: -0.5,
    releaseDate: "-",
    color: "#F0F0F0",
  },
];

export default BATTERIES;
