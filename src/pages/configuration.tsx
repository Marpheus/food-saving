import type React from "react";
import {Suspense, useEffect, useRef, useState} from "react";
import Head from "next/head";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useConfig from "@/store/store";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {object, string} from "yup";
import TextInput from "@/components/TextInput";
import ReactLoading from "react-loading";
import SelectInput from "@/components/SelectInput";

const btn =
    "inline-flex items-center px-3 py-1.5 mx-1 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

interface FormValues {
    email: string
    meatFishThreshold: string
    bistroThreshold: string
    plantBasedThreshold: string
    bakeryThreshold: string
    fruitVegetablesThreshold: string
    sausagesThreshold: string
    dairyThreshold: string
    durableThreshold: string
    drinksThreshold: string
    specialThreshold: string
    cosmeticsThreshold: string
    childrenThreshold: string
    otocObalThreshold: string
}

export default function Configuration() {

    const userConfigFromStore = useConfig((state: any) => state.userConfig)
    const emailFromStore = useConfig((state: any) => state.email)
    const updateConfig = useConfig((state: any) => state.updateConfig)
    const [userConfig, setUserConfig] = useState()
    const [email, setEmail] = useState()
    useEffect(() => {
        setUserConfig(userConfigFromStore)
        setEmail(emailFromStore)
    }, [userConfigFromStore, emailFromStore])

    const formRef = useRef<FormikProps<FormValues>>(null)

    const notifyOk = () => toast.success("OK");
    const notifyError = () => toast.error("Chyba");
    const handleUpdatePreferences = async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        setSubmitting(true)

        await fetch('./api/updateConfig', {
            method: 'POST',
            body: JSON.stringify({email: values.email, config: userConfig}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                notifyOk()
            } else {
                notifyError()
            }
        }).catch((e) => {
            notifyError()
        })
    }

    const validationSchema = () =>
        object({
            email: string().email('Chybn?? form??t emailu').required('Povinn?? pole'),
            meatFishThreshold: string().required('Povinn?? pole'),
            bistroThreshold: string().required('Povinn?? pole'),
            plantBasedThreshold: string().required('Povinn?? pole'),
            bakeryThreshold: string().required('Povinn?? pole'),
            fruitVegetablesThreshold: string().required('Povinn?? pole'),
            sausagesThreshold: string().required('Povinn?? pole'),
            dairyThreshold: string().required('Povinn?? pole'),
            durableThreshold: string().required('Povinn?? pole'),
            drinksThreshold: string().required('Povinn?? pole'),
            specialThreshold: string().required('Povinn?? pole'),
            cosmeticsThreshold: string().required('Povinn?? pole'),
            childrenThreshold: string().required('Povinn?? pole'),
            otocObalThreshold: string().required('Povinn?? pole'),
        })

    const onSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    if (!userConfig || !email) {
        return <ReactLoading type='spin' color='#bada55' height={'20%'} width={'20%'}/>
    }

    const selectBoxOptions = [
        {text: 'Nechcem', value: 100},
        {text: 'V??etky', value: 0},
        {text: '> 10%', value: 10},
        {text: '> 20%', value: 20},
        {text: '> 30%', value: 30},
        {text: '> 40%', value: 40},
        {text: '> 50%', value: 50},
    ]

    return (
        <Suspense fallback={<ReactLoading type='spin' color='#bada55' height={'20%'} width={'20%'}/>}>
            <div
                className="h-full w-full md:h-screen md:w-screen overflow-hidden flex flex-col justify-between items-center relative font-poppins bg-black">
                <Head>
                    <title>Zachra?? ??r??dlo - Nastavenia</title>
                </Head>
                <ToastContainer theme='colored'/>
                <div
                    className="p-8 flex justify-between items-center max-w-2xl animate-fade-in">
                    <Formik<FormValues>
                        onSubmit={handleUpdatePreferences}
                        validationSchema={validationSchema}
                        initialValues={{
                            email: email || '',
                            // @ts-ignore
                            meatFishThreshold: userConfig.meatFish.threshold || 0,
                            // @ts-ignore
                            bistroThreshold: userConfig.bistro.threshold || 0,
                            // @ts-ignore
                            plantBasedThreshold: userConfig.plantBased.threshold || 0,
                            // @ts-ignore
                            bakeryThreshold: userConfig.bakery.threshold || 0,
                            // @ts-ignore
                            fruitVegetablesThreshold: userConfig.fruitVegetables.threshold || 0,
                            // @ts-ignore
                            sausagesThreshold: userConfig.sausages.threshold || 0,
                            // @ts-ignore
                            dairyThreshold: userConfig.dairy.threshold || 0,
                            // @ts-ignore
                            durableThreshold: userConfig.durable.threshold || 0,
                            // @ts-ignore
                            drinksThreshold: userConfig.drinks.threshold || 0,
                            // @ts-ignore
                            specialThreshold: userConfig.special.threshold || 0,
                            // @ts-ignore
                            cosmeticsThreshold: userConfig.cosmetics.threshold || 0,
                            // @ts-ignore
                            childrenThreshold: userConfig.children.threshold || 0,
                            // @ts-ignore
                            otocObalThreshold: userConfig.otocObal.threshold || 0,
                        }}
                        innerRef={formRef}
                    >
                        {({touched, errors, values, setFieldValue}) => (
                            <Form>
                                <div className='flex mb-5'>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        maxLength="30"
                                        component={TextInput}
                                        onTextChange={(text: string) => {
                                            setFieldValue('email', text)
                                        }}
                                        value={values.email}
                                        placeholder=""
                                        disabled
                                        autocomplete="email"
                                        label={'Email'}
                                    />
                                    {touched.email && errors.email && (
                                        <div className="text-red-600 text-sm pt-2">{errors.email}</div>
                                    )}
                                </div>
                                < hr/>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="meatFishThreshold"
                                        name="meatFishThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                meatFish: {
                                                    // @ts-ignore
                                                    id: userConfig.meatFish.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('meatFishThreshold', parseInt(text))
                                        }}
                                        value={values.meatFishThreshold}
                                        label={'Maso a ryby'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="bistroThreshold"
                                        name="bistroThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                bistro: {
                                                    // @ts-ignore
                                                    id: userConfig.bistro.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('bistroThreshold', parseInt(text))
                                        }}
                                        value={values.bistroThreshold}
                                        label={'Bistro'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="plantBasedThreshold"
                                        name="plantBasedThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                plantBased: {
                                                    // @ts-ignore
                                                    id: userConfig.plantBased.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('plantBasedThreshold', parseInt(text))
                                        }}
                                        value={values.plantBasedThreshold}
                                        label={'Plant based'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="bakeryThreshold"
                                        name="bakeryThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                bakery: {
                                                    // @ts-ignore
                                                    id: userConfig.bakery.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('bakeryThreshold', parseInt(text))
                                        }}
                                        value={values.bakeryThreshold}
                                        label={'Pek??rna a cukr??rna'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="fruitVegetablesThreshold"
                                        name="fruitVegetablesThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                fruitVegetables: {
                                                    // @ts-ignore
                                                    id: userConfig.fruitVegetables.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('fruitVegetablesThreshold', parseInt(text))
                                        }}
                                        value={values.fruitVegetablesThreshold}
                                        label={'Ovoce a zelenina'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="sausagesThreshold"
                                        name="sausagesThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                sausages: {
                                                    // @ts-ignore
                                                    id: userConfig.sausages.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('sausagesThreshold', parseInt(text))
                                        }}
                                        value={values.sausagesThreshold}
                                        label={'Uzeniny a lah??dky'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="dairyThreshold"
                                        name="dairyThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                dairy: {
                                                    // @ts-ignore
                                                    id: userConfig.dairy.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('dairyThreshold', parseInt(text))
                                        }}
                                        value={values.dairyThreshold}
                                        label={'Ml????n?? a chlazen??'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="durableThreshold"
                                        name="durableThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                durable: {
                                                    // @ts-ignore
                                                    id: userConfig.durable.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('durableThreshold', parseInt(text))
                                        }}
                                        value={values.durableThreshold}
                                        label={'Trvanliv??'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="drinksThreshold"
                                        name="drinksThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                drinks: {
                                                    // @ts-ignore
                                                    id: userConfig.drinks.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('drinksThreshold', parseInt(text))
                                        }}
                                        value={values.drinksThreshold}
                                        label={'N??poje'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="specialThreshold"
                                        name="specialThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                special: {
                                                    // @ts-ignore
                                                    id: userConfig.special.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('specialThreshold', parseInt(text))
                                        }}
                                        value={values.specialThreshold}
                                        label={'Speci??ln?? v????iva'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="cosmeticsThreshold"
                                        name="cosmeticsThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                cosmetics: {
                                                    // @ts-ignore
                                                    id: userConfig.cosmetics.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('cosmeticsThreshold', parseInt(text))
                                        }}
                                        value={values.cosmeticsThreshold}
                                        label={'Drogerie a kosmetika'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="childrenThreshold"
                                        name="childrenThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                children: {
                                                    // @ts-ignore
                                                    id: userConfig.children.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('childrenThreshold', parseInt(text))
                                        }}
                                        value={values.childrenThreshold}
                                        label={'D??t??'}
                                    />
                                </div>
                                <div className='flex mb-2 mt-2 flex-row'>
                                    <Field
                                        id="otocObalThreshold"
                                        name="otocObalThreshold"
                                        component={SelectInput}
                                        options={selectBoxOptions}
                                        onTextChange={(text: string) => {
                                            updateConfig({
                                                otocObal: {
                                                    // @ts-ignore
                                                    id: userConfig.otocObal.id,
                                                    threshold: parseInt(text),
                                                    enabled: text !== '100'
                                                }
                                            })
                                            setFieldValue('otocObalThreshold', parseInt(text))
                                        }}
                                        value={values.otocObalThreshold}
                                        label={'Oto?? obal'}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='pt-4 pb-4'>
                    <button className={btn} type="submit" onClick={onSubmit}>Upravi??
                    </button>
                </div>
                <footer>
                    <div className="w-full text-xl text-center pb-5">
                        <span className="p-4"><a href='https://github.com/Marpheus/food-saving'>Github</a></span>
                    </div>
                </footer>
            </div>
        </Suspense>
    );
}