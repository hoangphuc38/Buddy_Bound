import { MarkerComponent } from './MarkerComponent';

export abstract class MarkerDecorator implements MarkerComponent {
    constructor(protected wrappedMarker: MarkerComponent) {}

    render(): JSX.Element {
        return this.wrappedMarker.render();
    }
}
