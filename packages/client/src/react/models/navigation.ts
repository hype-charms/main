
export interface BaseNavData {
    title: string;
    href: string;
}

export interface NavigationDataProps extends BaseNavData {
    sub_routes?: SubRoute[];
}

export interface SubRoute extends BaseNavData { childRoutes?: BaseNavData[] } 