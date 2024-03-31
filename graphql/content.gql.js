const getLinks = (...types) => {
    return `
        links {
            entries {
                block {
                    sys {
                        id
                    }
                    ${types.join(`\n`)}
                }
            }
        }
    `
}

const StaggeredHeaderType = `
... on StaggeredHeader {
    text
    transitionType
    elementTag
}
`;

const HeroType = `
... on ComponentHero {
    background {
        url
        contentType
    }
    content {
        json
        ${getLinks(StaggeredHeaderType)}
    }
    width
    height
    justify
    align
    textAlign
    showScrollHint
}
`;

const CircleSectionType = `
... on CircleSection {
    title
    leftContent {
        json
    }
    circleMedia {
        url
        width
        height
    }
    bulletPointsCollection {
        items {
            title
            text
        }
    }
}
`

const SectionType = `
... on Section {
    id
    title
    forceOnTop
    content {
        json
        ${getLinks(HeroType, CircleSectionType)}
    }
}
`;

const HubspotFormType = `
... on HubspotForm {
    title
    formId
    requireRecaptcha
    width
    align
    showSocials
    image {
        url
        width
        height
    }
}
`;

const SplineSceneType = `
... on SplineScene {
    internalName
    sceneUrl
    position
    hideOnMobile
    initialState {
        splineObjectNames
        endState {
            duration
            scale
            position
            rotation
        }
    }
    animationsCollection {
        items {
            internalName
            splineObjectNames
            sectionTrigger {
                id
            }
            startTrigger
            endTrigger
            endState {
                duration
                scale
                position
                rotation
            }
        }
    }
}
`

export const AllContentTypes = `
${SectionType}
${HubspotFormType}
${SplineSceneType}
`