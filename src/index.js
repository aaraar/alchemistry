import { Header } from './js/header';
import './style.css';
import './styles/main.scss';

let header = new Header();
let firstHeading = header.getFirstHeading();

console.log(firstHeading);