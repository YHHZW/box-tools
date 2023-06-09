import type {Callbacks, FieldEntity, FormInstance, NamePath, Store} from "../types/interface";

export default class FormFactory {
    private store: Store = {}
    private initialValues: Store = {}
    private callbacks: Callbacks = {}
    private fieldEntities: FieldEntity[] = [];

    getFieldsValue = () => {
        return { ...this.store };
    }

    getFieldValue = (name: NamePath) => {
        return this.store[name];
    }

    validateField = () => {
        const err: any[] = [];
        this.fieldEntities.forEach((entity) => {
            const { name, rules } = entity.props;
            const value: NamePath = name && this.getFieldValue(name);
            let rule = rules?.length && rules[0];
            if (rule && rule.required && (value === undefined || value === "")) {
                name && err.push({ [name]: rule && rule.message, value });
            }
        });

        return err;
    }

    setFieldsValue = (newStore: Store) => {
        this.store = {
            ...this.store,
            ...newStore,
        };
        // update Filed
        this.fieldEntities.forEach((entity) => {
            Object.keys(newStore).forEach((k) => {
                if (k === entity.props.name) {
                    entity.onStoreChange();
                }
            });
        });
    }

    setCallbacks = (callbacks: Callbacks) => {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    private setInitialValues = (initialValues: Store, init: boolean) => {
        this.initialValues = initialValues
        if (init) {
            this.store = { ...initialValues }
        }
    }

    private resetFields = (nameList?: NamePath[]) => {

        if (!nameList) {
            this.store = {...this.initialValues}
            this.notifyObservers()
        }

    }

    private notifyObservers = () => {
        this.fieldEntities.forEach((entity) => {
            entity.onStoreChange()
        })
    }

    // 订阅与取消订阅
    registerFieldEntities = (entity: FieldEntity) => {
        this.fieldEntities.push(entity);
        return () => {
            this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
            const { name } = entity.props;
            name && delete this.store[name];
        };
    }

    submit = () => {
        const { onFinish, onFinishFailed } = this.callbacks;
        const err = this.validateField();
        if (err.length === 0) {
            onFinish && onFinish(this.getFieldsValue());
        } else {
            onFinishFailed && onFinishFailed(err);
        }
    }

    getForm = (): FormInstance => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            submit: this.submit,
            setCallbacks: this.setCallbacks,
            setInitialValues: this.setInitialValues,
            resetFields: this.resetFields,
            registerFieldEntities: this.registerFieldEntities,
        };
    }
}