import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const siderStyle: React.CSSProperties = {
        overflow: "auto",
        height: "100vh", // Asegura que el Sider ocupe toda la altura
        position: "fixed", // Fija el Sider
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        width: collapsed ? 80 : 250, // Cambia el ancho según el estado del colapso
        padding: 16,
        textAlign: "center",
        backgroundColor: "#001529", // Asegura el color de fondo
        transition: "width 1s", // Transición suave al colapsar
    };

    const contentStyle: React.CSSProperties = {
        marginLeft: collapsed ? 80 : 200, // Deja espacio para el Sider fijo
        marginTop: "64px", // Deja espacio para el Header fijo
        padding: 16,
        // height: "100vh", // No es necesario forzar la altura
        overflowY: "auto", // Permite que el contenido se desplace verticalmente
        borderRadius: borderRadiusLG, // Bordes redondeados
        backgroundColor: "#ffffff", // Fondo blanco para el contenido
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra sutil para el contenido
        transition: "margin-left 0.2s", // Transición suave para el contenido
        maxHeight: "calc(100vh - 64px)", // Limita la altura del contenido para que no ocupe toda la pantalla
    };

    return (
        <Layout hasSider style={{ minHeight: "100vh" }}>
            <Sider
                style={siderStyle}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo" style={{ color: "white", padding: 16 }}>
                    {collapsed ? "NA" : "Nómina APP"}
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item
                        key="1"
                        icon={<HomeOutlined />}
                        onClick={() => navigate("/")}
                    >
                        Inicio
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<TeamOutlined />}
                        onClick={() => navigate("/employees")}
                    >
                        Empleados
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        position: "fixed",
                        top: 0,
                        backgroundColor: colorBgContainer,
                        padding: 0,
                        color: "white",
                        marginLeft: collapsed ? 80 : 200, // Deja espacio para el Sider
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        zIndex: 1,
                        width: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra sutil debajo del Header
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ marginLeft: "auto", paddingRight: "16px" }}>
                        Nómina App
                    </div>
                </Header>

                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
