<template>
  <li class="imageItem">
    <div v-lazy:background-image="`${image.imageUrlPath}`" class="thumbnailImage">
      <div class="iconWrapper">
        <icon name="camera" class="camera" scale="1" />
      </div>
    </div>
  </li>
</template>

<script>
export default {
  /**
   * @prop {Object} images Object image using `fileName` prop for filename.
   */
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.imageItem {
  // For L screen, shows 4 items a row.
  width: getItemWidth($image-list-gutter, 4);
  position: relative;

  // For XS and S screens, shows 2 items a row, expected for the first line.
  @media #{$breakpoint-xs-s} {
    width: getItemWidth($image-list-gutter, 2);
    &:first-child {
      width: getItemWidth($image-list-gutter, 1);
    }
  }

  // For M screen, shows 3 items a row, expected for the first three lines.
  @media #{$breakpoint-s-m} {
    width: getItemWidth($image-list-gutter, 3);
    &:first-child {
      width: getItemWidth($image-list-gutter, 1);
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: getItemWidth($image-list-gutter, 2);
    }
  }

  .thumbnailImage {
    // Performance issue, for more informations
    // @see https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/
    transform: translate3d(0, 0, 0);

    // Defines animation when image is loading.
    // Starts the rotating animation.
    &[lazy="loading"] {
      .iconWrapper {
        animation: rotateAnimate 2s linear infinite;
      }
    }

    // Defines animation when image is loaded.
    // Stops the rotating animation.
    &[lazy="loaded"] {
      .iconWrapper {
        animation: none 0.5s ease infinite;
      }
    }

    // CSS tricks to display image in 16:9 even if size doesn't match.
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    padding-bottom: 56.25%;

    margin-bottom: $image-list-gutter;
    border-radius: 4px;

    .iconWrapper {
      animation: bounce 0.5s ease infinite;
      background-color: $icon-background-color;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 26px;
      margin-top: -13px;
      margin-left: -13px;
      display: flex;
      align-items: center;
      justify-content: center;

      .camera {
        color: white;
      }
    }
  }
}
</style>
