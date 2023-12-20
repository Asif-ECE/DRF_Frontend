import LoginProvider from "@/contexts/loginContext";

function NextApp({ Component, pageProps }) {
    return (
        <LoginProvider>
            <Component {...pageProps} />
        </LoginProvider>
    );
}

export default NextApp