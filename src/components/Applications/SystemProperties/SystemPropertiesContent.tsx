
const SystemPropertiesContent: React.FC = () => {
    return (
        <section className="tabs p-3">
            <menu role="tablist" aria-label="system-properties-tabs" className="tabs-menu">
                <button role="tab" aria-selected="true" aira-controls="tab-general">Tab A</button>
                <button role="tab" aria-controls="tab-advanced">Tab B</button>
            </menu>

            <article role="tabpanel" id="tab-general">
                <h3>Tab Content</h3>
            </article>

            <article role="tabpanel" hidden id="tab-advanced">
                <h3>Tab BBB</h3>
            </article>
        </section>
    );
};
export default SystemPropertiesContent;