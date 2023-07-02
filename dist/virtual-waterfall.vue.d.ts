declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    key: {
        type: import("vue").PropType<string>;
        default: string;
    };
    gap: {
        type: import("vue").PropType<number>;
        default: number;
    };
    preloadScreenCount: {
        type: import("vue").PropType<number>;
        default: number;
    };
    bottomDistance: {
        type: import("vue").PropType<number>;
        default: number;
    };
    itemMinWidth: {
        type: import("vue").PropType<number>;
        default: number;
    };
    loading: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    items: {
        type: import("vue").PropType<any[]>;
        default: () => any[];
    };
    calcItemHeight: {
        type: import("vue").PropType<(item: any, itemWidth: number) => number>;
        default: (item: any, itemWidth: number) => 0;
    };
}, {
    backTop(): void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "load-more"[], "load-more", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    key: {
        type: import("vue").PropType<string>;
        default: string;
    };
    gap: {
        type: import("vue").PropType<number>;
        default: number;
    };
    preloadScreenCount: {
        type: import("vue").PropType<number>;
        default: number;
    };
    bottomDistance: {
        type: import("vue").PropType<number>;
        default: number;
    };
    itemMinWidth: {
        type: import("vue").PropType<number>;
        default: number;
    };
    loading: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    items: {
        type: import("vue").PropType<any[]>;
        default: () => any[];
    };
    calcItemHeight: {
        type: import("vue").PropType<(item: any, itemWidth: number) => number>;
        default: (item: any, itemWidth: number) => 0;
    };
}>> & {
    "onLoad-more"?: (...args: any[]) => any;
}, {
    key: string;
    gap: number;
    preloadScreenCount: number;
    bottomDistance: number;
    itemMinWidth: number;
    loading: boolean;
    items: any[];
    calcItemHeight: (item: any, itemWidth: number) => number;
}, {}>, {
    default(props: {
        item: any;
        index: number;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
