import ReportPresence from "../components/presence/ReportPresence";
import AdminView from "../components/presence/AdminView";

export const PresenceRoutes = {
    path: '/',
    children: [
        {
            path: '/presence/admin',
            element: <AdminView />
        },
        {
            path: '/presence/:username',
            element: <ReportPresence />
        },
    ]
}