const buildAssetUrl = type => `../assets/${type}.png`;

export const loadAssets = (assetList) =>
  Promise.all(
    assetList
      .map(compose(loadImage, buildAssetUrl)))
    .then(images => zip(assetList, images)
      .reduce(appendEntry, {}));

export const render = (ctx, assets, entities) => {
  clearScreen(ctx);
  const strategies = {
    sprite: renderSprite,
    circle: renderCircle,
    line: renderLine,
  };
  entities.forEach(entity => );
};
