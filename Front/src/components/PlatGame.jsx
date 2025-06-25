const PlatGame = (props = []) => {
    const { platform } = props;

    const logo = [
        { slug: "pc", logo: `<i class="fa-brands fa-windows"></i>` },
        { slug: "playstation", logo: `<i class="fa-brands fa-playstation"></i>` },
        { slug: "xbox", logo: `<i class="fa-brands fa-xbox"></i>` },
        { slug: "ios", logo: `<i class="fa-brands fa-app-store-ios"></i>` },
        { slug: "mac", logo: `<i class="fa-brands fa-apple"></i>` },
        { slug: "linux", logo: `<i class="fa-brands fa-linux"></i>` },
        { slug: "nintendo", logo: `<i class="fa-solid fa-gamepad"></i>` },
        { slug: "android", logo: `<i class="fa-brands fa-android"></i>` },
    ]; 
    const platformSlug = Array.isArray(platform) ? platform.map((p) => p.slug) : [];
    const matchingPlatform = logo.filter((p) => platformSlug.includes(p.slug));

    return (
        <>
            {matchingPlatform &&
                matchingPlatform.map((m) => (
                    <span
                        key={m.slug}
                        dangerouslySetInnerHTML={{ __html: m.logo }}
                    />
            ))}
        </> 
    );
};

export default PlatGame;
