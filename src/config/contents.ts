/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader = {
  header: `Rate a Barber`,
  subheader: `Search over 2 million barbers and their ratings.`,
  image: `/barber-hero-image.jpg`
}

export const placeholder = {
  image: `/placeholder.svg`
}

export const featureCards = {
  header: `Trusted by`,
  subheader: `The slickest looking chaps around.`,
  content: [
    {
      text: `1.7 million +`,
      subtext: `Happy lads`
    },
    {
      text: `2 million +`,
      subtext: `Awesome barbers`
    },
    {
      text: `1 million +`,
      subtext: `Butch ladies.`
    }
  ]
}

export const features = {
  header: `Features`,
  subheader: `Why use Next Landing?`,
  image: `/features-img.webp`,
  content: [
    {
      text: `SEO Optimized`,
      subtext: `Improved website visibility on search engines`,
      icon: 'fileSearch'
    },
    {
      text: `Highly Performant`,
      subtext: `Fast loading times and smooth performance`,
      icon: 'barChart'
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
      icon: 'settings'
    }
  ]
}
