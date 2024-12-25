import { MarkerView } from '@rnmapbox/maps';
import { BuddyBoundCoordinate, MarkerComponent } from './MarkerComponent';
import React from 'react';

export class BaseMarker implements MarkerComponent {
    constructor(private coordinate: BuddyBoundCoordinate) {}

    getCoordinate(): BuddyBoundCoordinate {
        return this.coordinate;
    }

    render(): JSX.Element {
        return (
            <MarkerView
                coordinate={[this.coordinate.longitude, this.coordinate.latitude]}
            />
        );
    }
}
