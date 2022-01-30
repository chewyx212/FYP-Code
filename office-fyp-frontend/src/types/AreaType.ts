export interface CreateAreaType {
  data: { name: string };
  floorplan: File;
}

export interface AreaType {
  id: string;
  name: string;
  imagePath: string;
  status: boolean;
}
