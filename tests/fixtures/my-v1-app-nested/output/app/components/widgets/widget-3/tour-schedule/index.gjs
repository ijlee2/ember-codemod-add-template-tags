import { hash } from '@ember/helper';
import WidgetsWidget3TourScheduleResponsiveImage from 'docs-app/components/widgets/widget-3/tour-schedule/responsive-image/index';

import Component from '@glimmer/component';

import styles from './index.css';

export default class WidgetsWidget3TourSchedule extends Component {
  styles = styles;


  <template>
  <ContainerQuery
  @features={{hash small=(width max=400)}}
  @dataAttributePrefix="cq"
  class={{this.styles.container}}
  >
  <div class={{this.styles.splash}}>
  <div class={{this.styles.splash-image-container}}>
    {{#if @concert.images}}
      <WidgetsWidget3TourScheduleResponsiveImage
        @images={{@concert.images}}
      />
    {{else}}
      <div class={{this.styles.placeholder-image}}></div>
    {{/if}}
  </div>

  <div class={{this.styles.concert-date-container}}>
    <time class={{this.styles.concert-date}}>
      {{@concert.date}}
    </time>
  </div>

  <div class={{this.styles.venue-name-container}}>
    <a class={{this.styles.concert-link}} href="#">
      <div class={{this.styles.venue-name}}>
        {{@concert.name}}
      </div>
    </a>
  </div>
  </div>
  </ContainerQuery>
  </template>
}
