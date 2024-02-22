---
title: Discovering History with Archeomaps
date: '2024-02-22'
tags: ['history', 'maps', 'mapbox']
draft: false
summary: Archeomaps is a remarkable project driven by Jaimy Visser's passion for history and his dedication to making it accessible to everyone.
images: []
layout: PostLayout
canonicalUrl: https://archeomaps.stevejonk.com
repoUrl: https://github.com/SteveJonk/archeomaps
---

Archeomaps is an exciting project that brings history to life by pinpointing significant historical points on a world map and providing fascinating information about each location. This innovative endeavor, spearheaded by Jaimy Visser and made possible through the generous contribution of the entire dataset, offers a unique way to explore our rich cultural heritage.

## A Grateful Acknowledgment

I owe a huge debt of gratitude to Jaimy for his vision and dedication to preserving our collective heritage. His commitment to this project has been instrumental in shaping Archeomaps into what it is today. If you're as passionate about history as Jaimy is, I encourage you to follow Archeomaps on [Facebook](https://www.facebook.com/Archeomaps) and join us in this journey.
Additionally, I express my appreciation to co-worker Ronny Rook, with who I completed this project together.

## Bringing History to Life

Archeomaps leverages the power of Mapbox to provide users with a seamless and intuitive mapping experience. One of the features I'm particularly proud of is the ability to switch between different themes and filter historical points based on various time periods. This dynamic functionality allows users to tailor their exploration to their specific interests and delve deeper into the past.

## Uncovering Hidden Gems

The dataset, graciously provided by Jaimy Visser, forms the backbone of Archeomaps. To enhance the richness of the experience, we employed AI to generate additional information about each historical point, offering users a deeper insight into its significance. Whether you're exploring ancient civilizations, medieval landmarks, or modern historical events, Archeomaps promises to unveil hidden gems from across the globe.

## Dive into History

I invite you to embark on your own journey through history by visiting the Archeomaps app at [archeomaps.stevejonk.com](https://archeomaps.stevejonk.com). Immerse yourself in the stories of the past and uncover the fascinating details that shape our world today.

## Behind the Scenes: Exploring the Main Component

At the core of Archeomaps lies the MapView component, a testament to the meticulous craftsmanship that went into creating this platform. Within the `MapView.tsx` file, you'll find the code that powers the interactive map interface, allowing users to engage with historical points and discover intriguing insights with ease.
This is the core code:

```jsx
export function MapView({ currentLocation, setCurrentLocation }: MapViewProps) {
    const { config, setConfig, filterOptions } = useConfig()
    const { mapData, filterMapData, resetMapData } = useMapData()
    const router = useRouter()

    const { filters } = config

    useEffect(() => {
        filters && filterMapData(filters)
    }, [filters])

    const [mapRef, setRef] = useInitialMapZoom({
        mapData,
        location: router.query.location as string,
        currentLocation,
        setCurrentLocation,
    })

    function onMapClick(event: MapLayerMouseEvent) {
        const features = event.features || []

        if (features.length > 0 && mapRef?.current) {
            const feature = event.features[0] as GeoJSON.Feature<GeoJSON.Point>
            const clusterId = feature.properties.cluster_id
            const mapboxSource = mapRef.current.getSource('archeomaps') as GeoJSONSource

            if (clusterId) {
                mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (err) return
                    mapRef.current.easeTo({
                        center: feature.geometry.coordinates as [number, number],
                        zoom,
                        duration: 500,
                    })
                })
            }

            if (!clusterId && feature) {
                // Redirect with loaction name in url, next useEffect will show DetailView
                setCurrentLocation({
                    icon: feature?.properties?.icon,
                    name: feature?.properties?.name,
                    description: feature?.properties?.description,
                    longitude: feature?.geometry.coordinates[0],
                    latitude: feature?.geometry.coordinates[1],
                })

                mapRef.current.easeTo({
                    center: feature.geometry.coordinates as [number, number],
                    zoom: ZOOM_FACTOR,
                    duration: 500,
                })

                const formattedName = formatName(feature.properties.name)
                window.history.replaceState('', '', `/?location=${formattedName}`)
            }
        }
    }

    return (
        <>
            <AnimatePresence>
                {currentLocation && (
                    <DetailView
                        title={currentLocation.name}
                        description={currentLocation.description}
                        category={currentLocation.icon}
                        onClickAway={() => setCurrentLocation(null)}
                    />
                )}
            </AnimatePresence>
            <Sidebar
                config={config}
                setConfig={setConfig}
                filterOptions={filterOptions}
                resetMapData={resetMapData}
            />
            <Map
                ref={setRef}
                initialViewState={INITIAL_VIEW_STATE}
                style={{ position: 'absolute', zIndex: 10, top: 0, left: 0, right: 0, bottom: 0 }}
                mapStyle={config.mapStyle.url}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
                onClick={onMapClick}
            >
                <Source
                    id="archeomaps"
                    type="geojson"
                    data={mapData}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            </Map>
        </>
    )
}
```

## Conclusion

Archeomaps is not just a project; it's a labor of love aimed at rekindling appreciation for history. Through its immersive experience, rich dataset, and innovative features, Archeomaps invites you to embark on a journey through time like never before.
