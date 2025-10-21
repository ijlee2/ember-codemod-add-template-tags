import Controller from '@ember/controller';
import type { Model } from 'docs-app/routes/album';

import styles from './album.css';

export default class AlbumController extends Controller {
  declare model: Model;

  styles = styles;
}
