import { useThemeContext } from "../../../context"
import React, { FC } from "react";
import { HeaderComponentSingleDropdownsProps, HeaderComponentSingleDropdowns, HeaderComponentMainDropdown } from "../header.component/index"
import { Layout } from "./template";
import { BaseNavData } from "../../../models/navigation";



export interface LayoutComponentProps extends HeaderComponentSingleDropdownsProps {
    subheader_content: { navigation: BaseNavData[] },
    eventheader_content: { navigation: BaseNavData[] },
    children: JSX.Element;
}
export const LayoutComponent: FC<LayoutComponentProps> = ({ children, header_content, subheader_content, eventheader_content, onCartClick, onProfileClick }) => {
    const theme = useThemeContext();
    return (
        <Layout theme={theme}>
            {theme?.ui_theme?.header?.menu_configuration === "link-specific" && <HeaderComponentSingleDropdowns onProfileClick={onProfileClick} onCartClick={onCartClick} eventheader_content={eventheader_content} subheader_content={subheader_content} header_content={header_content} />}
            {theme?.ui_theme?.header?.menu_configuration === "single" && <HeaderComponentMainDropdown onProfileClick={onProfileClick} onCartClick={onCartClick} eventheader_content={eventheader_content} subheader_content={subheader_content} header_content={header_content} />}
            {children}
        </Layout>
    )
}