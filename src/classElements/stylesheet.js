


export function getStyleHtml(brandVisualIdentity) {

    return generateBrandStyleHeader(brandVisualIdentity)

}

function generateBrandStyleHeader(brandIdentity) {
    if (!brandIdentity || brandIdentity['@type'] !== 'BrandVisualIdentity') {
        console.error('Invalid BrandVisualIdentity record.');
        return '';
    }

    // Helper to extract the numeric values from rgb(r, g, b) for Bootstrap's RGB custom properties
    const toRawRgb = (rgbStr) => {
        if (!rgbStr) return '';
        const match = rgbStr.match(/\d+,\s*\d+,\s*\d+/);
        return match ? match[0] : rgbStr;
    };

    // Mapping color names to their incoming properties
    const colors = {
        primary: brandIdentity.colorPrimary,
        secondary: brandIdentity.colorSecondary,
        success: brandIdentity.colorSuccess,
        info: brandIdentity.colorInfo,
        warning: brandIdentity.colorWarning,
        danger: brandIdentity.colorDanger,
        light: brandIdentity.colorLight,
        dark: brandIdentity.colorDark,
    };

    // Generate the standard CSS variable definitions dynamically
    let colorVariables = '';
    for (const [key, value] of Object.entries(colors)) {
        if (value) {
            colorVariables += `        --bs-${key}: ${value};\n`;
            colorVariables += `        --bs-${key}-rgb: ${toRawRgb(value)};\n`;
        }
    }

    return `
<style id="dynamic-brand-styles">
    :root {
        /* Dynamically Mapped Bootstrap Theme Colors */
${colorVariables}
        /* Neutral / Body Overrides */
        --bs-body-color: ${brandIdentity.colorNeutral || 'rgb(0,0,0)'};
        --bs-body-font-family: ${brandIdentity.typographyBodyFontFamily};
        --bs-body-font-size: ${brandIdentity.typographyBodyFontSize};

        /* Global Component Spacing & Borders */
        --bs-border-radius: ${brandIdentity.baselineBorderRadius};
        --bs-border-radius-sm: calc(${brandIdentity.baselineBorderRadius} * 0.75);
        --bs-border-radius-lg: calc(${brandIdentity.baselineBorderRadius} * 1.5);
        
        /* Custom Spacing Unit */
        --brand-spacing-unit: ${brandIdentity.baselineSpacingUnit};
    }

    /* Heading Typography Overrides */
    h1, .h1 {
        font-family: ${brandIdentity.typographyH1FontFamily} !important;
        font-size: ${brandIdentity.typographyH1FontSize} !important;
    }
    h2, .h2 {
        font-family: ${brandIdentity.typographyH2FontFamily} !important;
        font-size: ${brandIdentity.typographyH2FontSize} !important;
    }
    h3, .h3 {
        font-family: ${brandIdentity.typographyH3FontFamily} !important;
        font-size: ${brandIdentity.typographyH3FontSize} !important;
    }

    /* Tertiary / Custom Utility Bridge (Since Bootstrap has no native tertiary utility) */
    .text-tertiary { color: ${brandIdentity.colorTertiary} !important; }
    .bg-tertiary { background-color: ${brandIdentity.colorTertiary} !important; }
    .btn-tertiary {
        color: #fff;
        background-color: ${brandIdentity.colorTertiary};
        border-color: ${brandIdentity.colorTertiary};
    }
    .btn-tertiary:hover {
        filter: brightness(90%);
    }
</style>
    `.trim();
}

function generateBrandStyleHeaderOLD(brandIdentity) {
    if (!brandIdentity || brandIdentity['@type'] !== 'BrandVisualIdentity') {
        console.error('Invalid BrandVisualIdentity record.');
        return '';
    }

    // Helper to convert rgb(r, g, b) to raw "r, g, b" for Bootstrap's RGB utility variables
    const toRawRgb = (rgbStr) => {
        const match = rgbStr.match(/\d+,\s*\d+,\s*\d+/);
        return match ? match[0] : rgbStr;
    };

    const primaryRaw = toRawRgb(brandIdentity.colorPrimary);
    const secondaryRaw = toRawRgb(brandIdentity.colorSecondary);
    const infoRaw = toRawRgb(brandIdentity.colorInfo) || '0, 0, 0';
    const successRaw = toRawRgb(brandIdentity.colorSuccess) || '0, 0, 0';
    const warningRaw = toRawRgb(brandIdentity.colorWarning) || '0, 0, 0';
    const dangerRaw = toRawRgb(brandIdentity.colorDanger) || '0, 0, 0';
    const tertiaryRaw = toRawRgb(brandIdentity.colorTertiary) || '0, 0, 0';
    const neutralRaw = toRawRgb(brandIdentity.colorNeutral) || '0, 0, 0';
    const lightRaw = toRawRgb(brandIdentity.colorLight) || '0, 0, 0';
    const darkRaw = toRawRgb(brandIdentity.colorDark) || '0, 0, 0';


    return `
<style id="dynamic-brand-styles">
    :root {
        /* Bootstrap 5 Color Overrides (Hex/RGB wrappers) */
        --bs-primary: ${brandIdentity.colorPrimary};
        --bs-primary-rgb: ${primaryRaw};
        --bs-secondary: ${brandIdentity.colorSecondary};
        --bs-secondary-rgb: ${secondaryRaw};
        --bs-body-color: ${brandIdentity.colorNeutral};
        --bs-info: ${brandIdentity.colorInfo};
        --bs-info-rgb: ${infoRaw};
        --bs-success: ${brandIdentity.colorSuccess};
        --bs-success-rgb: ${successRaw};
        --bs-warning: ${brandIdentity.colorWarning};
        --bs-warning-rgb: ${warningRaw};
        --bs-danger: ${brandIdentity.colorDanger};
        --bs-danger-rgb: ${dangerRaw};
        --bs-tertiary: ${brandIdentity.colorTertiary};
        --bs-tertiary-rgb: ${tertiaryRaw};
        --bs-neutral: ${brandIdentity.colorNeutral};
        --bs-neutral-rgb: ${neutralRaw};
        --bs-light: ${brandIdentity.colorLight};
        --bs-light-rgb: ${lightRaw};
        --bs-dark: ${brandIdentity.colorDark};
        --bs-dark-rgb: ${darkRaw};


        /* Body Typography Overrides */
        --bs-body-font-family: ${brandIdentity.typographyBodyFontFamily};
        --bs-body-font-size: ${brandIdentity.typographyBodyFontSize};

        /* Global Component Overrides */
        --bs-border-radius: ${brandIdentity.baselineBorderRadius};
        --bs-border-radius-sm: calc(${brandIdentity.baselineBorderRadius} * 0.75);
        --bs-border-radius-lg: calc(${brandIdentity.baselineBorderRadius} * 1.5);
        
        /* Custom Spacing Unit (If you wish to use it for custom layout adjustments) */
        --brand-spacing-unit: ${brandIdentity.baselineSpacingUnit};
    }

    /* Heading Typography Overrides */
    h1, .h1 {
        font-family: ${brandIdentity.typographyH1FontFamily} !important;
        font-size: ${brandIdentity.typographyH1FontSize} !important;
    }
    h2, .h2 {
        font-family: ${brandIdentity.typographyH2FontFamily} !important;
        font-size: ${brandIdentity.typographyH2FontSize} !important;
    }
    h3, .h3 {
        font-family: ${brandIdentity.typographyH3FontFamily} !important;
        font-size: ${brandIdentity.typographyH3FontSize} !important;
    }

    /* Tertiary and Custom Utility Classes (Since Bootstrap lacks a explicit tertiary variant out of the box) */
    .text-tertiary { color: ${brandIdentity.colorTertiary} !important; }
    .bg-tertiary { background-color: ${brandIdentity.colorTertiary} !important; }
    .btn-tertiary {
        color: #fff;
        background-color: ${brandIdentity.colorTertiary};
        border-color: ${brandIdentity.colorTertiary};
    }
    .btn-tertiary:hover {
        filter: brightness(90%);
    }
</style>
    `.trim();
}

export function exampleBrandVisualIdentity() {
    return {
        "@type": "BrandVisualIdentity",
        "validFrom": "2025-05-14",
        "validTo": "2026-05-14",
        "colorLight": "rgb(75, 17, 47)",
        "colorDark": "rgb(75, 17, 47)",
        "colorPrimary": "rgb(75, 17, 47)",
        "colorSecondary": "rgb(177, 46, 60)",
        "colorTertiary": "rgb(235, 94, 14)",
        "colorNeutral": "rgb(0, 0, 0)",
        "colorInfo": "rgb(0, 0, 0)",
        "colorSuccess": "rgb(0, 0, 0)",
        "colorWarning": "rgb(0, 0, 0)",
        "colorDanger": "rgb(0, 0, 0)",
        "typographyH1FontFamily": "'Playfair Display', serif",
        "typographyH1FontSize": "4.5rem",
        "typographyH2FontFamily": "'Playfair Display', serif",
        "typographyH2FontSize": "3.5rem",
        "typographyH3FontFamily": "'Playfair Display', serif",
        "typographyH3FontSize": "3rem",
        "typographyBodyFontFamily": "'Montserrat', sans-serif",
        "typographyBodyFontSize": "1.125rem",
        "baselineSpacingUnit": "4px",
        "baselineBorderRadius": "6px",
        "logoPathPrimary": "https://www.duchesnay.com/images/logo.svg",
        "faviconPath": "https://www.duchesnay.com/images/icons/favicon-32x32.png",
        "wcagContrastLevel": "AA"
    }

}