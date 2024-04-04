import { useRoutes } from "react-router-dom";
import { AuthenticationRoutes } from "./AuthenticationRoutes";
import { PresenceRoutes } from './PresenceRoutes'

export default function Router() {
    return useRoutes([AuthenticationRoutes, PresenceRoutes])
}