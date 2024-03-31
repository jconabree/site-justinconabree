import CircleSection from './CircleSection';
import Hero from './Hero';
import HubspotForm from './HubspotForm';
import Section from './Section';
import SplineScene from './SplineScene';
import StaggeredHeader from './StaggeredHeader';

const types = {
    CircleSection,
    ComponentHero: Hero,
    HubspotForm,
    Section,
    SplineScene,
    StaggeredHeader
};

export const getRenderer = (type, data) => {
    if (typeof types[type] !== 'undefined') {
        const Component = types[type];

        return <Component {...data} />
    }

    console.warn('Rich content type not found', type);

    return null;
}
