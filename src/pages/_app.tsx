/* eslint-disable react/jsx-filename-extension */
import type {ReactNode} from 'react';
import {Component} from 'react';

import {CacheProvider, Global, ThemeProvider} from '@emotion/react';
import styled from '@emotion/styled';
import {preloadFonts} from '@nfq/next-fonts';
import {ScreenBadge, ScreenSizeProvider} from '@nfq/react-grid';
import {AnimatePresence, LazyMotion} from 'motion/react';
import * as motion from 'motion/react-m';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import {LayoutTransition} from 'UI/animations/layout';

import {createEmotionCache} from 'Application/configs/emotionCache';
import {fontDefinitions, globals, theme} from 'UI/utils/globalStyles';

import type {EmotionCache} from '@emotion/cache';
import type {FeatureBundle} from 'motion/react';
import type {AppProps} from 'types/global';

import 'Fonts/fonts';

/**
 * `AxeCoreHelper` is a dynamic import of the `AxeCoreHelper` module from the 'UI/utils/AxeCoreHelper' path.
 * It is named dynamically by Webpack as "axeCoreHelper" and is not server-side rendered.
 * This import is crucial for utilizing the AxeCoreHelper utility functions and features within the application, especially for accessibility testing.
 *
 * @example
 * ```tsx
 * const AxeCoreHelper = AxeCoreHelper();
 *
 * <AxeCoreHelper />
 * ```
 */
const AxeCoreHelper = dynamic(async () => import(
    /* webpackChunkName: "axeCoreHelper" */
    'UI/utils/AxeCoreHelper'
), {ssr: false});

/**
 * `loadMotionFeatures` is an asynchronous function designed to dynamically import and return the default export of the `motionFeatures`
 * module from the 'UI/utils/motionFeatures' path.
 * It is named dynamically by Webpack as "motionFeatures".
 * This function is essential for loading motion-related features and utilities, allowing for enhanced user interface
 * interactions and animations within the application.
 *
 * @returns A promise resolving to the default export of the dynamically imported `motionFeatures` module, representing a bundle of motion-related features and utilities.
 *
 * @example
 * ```tsx
 * <LazyMotion features={loadMotionFeatures} strict>
 * ```
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        'UI/utils/motionFeatures'
    );

    return module.default;
};

const clientSideEmotionCache = createEmotionCache();

/**
 * The `App` class extends the `Component` class and serves as the main application component.
 * It is responsible for rendering the overall layout and structure of the application, including theming, global styles, and various providers.
 * This class is crucial for managing the overall appearance and behavior of the application and for wrapping the application with necessary context providers.
 */
class App extends Component<AppProps<object> & {emotionCache?: EmotionCache}> {
    /**
     * `getLayoutKey` is a method designed to retrieve the layout key from the PageComponent.
     * It is responsible for determining which layout should be used when rendering the application.
     * This method is crucial for managing different layouts within the application and for providing a default layout when none is specified.
     *
     * @returns A string representing the layout key, defaulting to 'default' if no layout key is provided by the PageComponent.
     *
     * @example
     * ```tsx
     * const layoutKey = this.getLayoutKey();
     * ```
     */
    getLayoutKey(): string {
        const {Component: PageComponent} = this.props;

        return PageComponent.getLayoutKey?.() ?? 'default';
    }

    /**
     * `chooseLayout` is a method designed to determine and return the appropriate layout based on the PageComponent.
     * It checks if the PageComponent has a `getLayout` method and calls it if present, otherwise, it returns the PageComponent itself.
     * This method is essential for rendering the correct layout based on the current page and its properties.
     *
     * @returns A ReactNode representing the chosen layout or the PageComponent.
     *
     * @example
     * ```tsx
     * const chosenLayout = this.chooseLayout();
     * ```
     */
    chooseLayout(): ReactNode {
        const {Component: PageComponent, pageProps, router} = this.props;
        const route = router.asPath.split('?')[0].split('#')[0];

        if (PageComponent.getLayout) {
            return PageComponent.getLayout(route, pageProps, PageComponent);
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <PageComponent {...pageProps} />;
    }

    /**
     * The `render` method is responsible for rendering the overall structure and elements of the application.
     * It includes various providers, global styles, and components necessary for the application to function correctly.
     * This method is crucial for defining the overall appearance and structure of the application.
     *
     * @returns A ReactNode representing the overall structure and elements of the application.
     */
    render(): ReactNode {
        const {emotionCache = clientSideEmotionCache} = this.props;

        return (
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <Head>
                        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
                        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
                        {preloadFonts(fontDefinitions)}
                    </Head>
                    <Global styles={globals} />
                    <AxeCoreHelper />
                    <ScreenSizeProvider>
                        <LazyMotion features={loadMotionFeatures} strict>
                            <AnimatePresence mode="wait">
                                <AnimationWrapper
                                    key={this.getLayoutKey()}
                                    animate="enter"
                                    exit="exit"
                                    initial="initial"
                                    variants={LayoutTransition}
                                >
                                    {this.chooseLayout()}
                                </AnimationWrapper>
                            </AnimatePresence>
                        </LazyMotion>
                        <ScreenBadge />
                    </ScreenSizeProvider>
                </ThemeProvider>
            </CacheProvider>
        );
    }
}

export default App;

const AnimationWrapper = styled(motion.div)`
    display: flex;
    flex: 1 2 auto;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
`;