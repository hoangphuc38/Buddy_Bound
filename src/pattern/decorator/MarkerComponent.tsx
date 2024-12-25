export interface MarkerComponent {
    render(): JSX.Element
    getCoordinate(): BuddyBoundCoordinate
}

export interface BuddyBoundCoordinate {
    longitude: number;
    latitude: number;
}
