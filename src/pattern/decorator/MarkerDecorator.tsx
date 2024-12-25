import { BuddyBoundCoordinate, MarkerComponent } from './MarkerComponent';

export abstract class MarkerDecorator implements MarkerComponent {
    constructor(protected wrappedMarker: MarkerComponent) {}
    getCoordinate(): BuddyBoundCoordinate {
        return this.wrappedMarker.getCoordinate();
    }

    render(): JSX.Element {
        return this.wrappedMarker.render();
    }
}
