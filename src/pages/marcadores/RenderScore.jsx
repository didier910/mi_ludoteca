import { TableroAkropolis } from "./Akropolis/TableroAkropolis"
import { TableroCalico } from "./Calico/TableroCalico"
import { TableroCarcassonne } from "./Carcassonne/TableroCarcassonne"
import { TableroSagrada } from "./Sagrada/TableroSagrada"
import { TableroSushi } from "./Sushi/TableroSushi"
import { TableroHarmonies } from "./Harmonies/TableroHarmonies"

const TABLERO_COMPONENTS = {
  '1': TableroAkropolis,
  '2': TableroCarcassonne,
  '3': TableroCalico,
  '4': TableroSagrada,
  '5': TableroSushi,
  '7': TableroHarmonies

}

export const RenderScore = ({ id, name = '', sumaPuntos, posicion }) => {
  const Component = TABLERO_COMPONENTS[id]
  return Component ? 
    <Component name={name} sumaPuntos={sumaPuntos} posicion={posicion} /> : 
    <p>0</p>
}

