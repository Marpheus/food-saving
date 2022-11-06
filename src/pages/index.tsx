import type React from "react";
import {useRef} from "react";
import Head from "next/head";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import {object, string} from "yup";
import TextInput from "@/components/TextInput";
import {useRouter} from "next/router";
import useConfig from "@/store/store";

const btn =
    "inline-flex items-center px-3 py-1.5 mx-1 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

interface FormValues {
    email: string
}

export default function Home() {
    const formRef = useRef<FormikProps<FormValues>>(null)
    const router = useRouter()
    const setupUser = useConfig((state: any) => state.setupUser)

    const notifyOk = () => toast.success("OK");
    const notifyError = () => toast.error("Chyba");
    const handleManageAccount = async (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        setSubmitting(true)

        await fetch('./api/manage', {
            method: 'POST',
            body: JSON.stringify({email: values.email}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (response.status === 200) {
                notifyOk()
                const body = await response.json()
                setupUser({config: body.user.config, email: body.user.email})
                router.push('/configuration')
            } else {
                notifyError()
            }
        }).catch((e) => {
            notifyError()
        })
    }

    const validationSchema = () =>
        object({
            email: string().email('Chybný formát emailu').required('Povinné pole'),
        })

    const onSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    return (
        <div
            className="h-full w-full md:h-screen md:w-screen overflow-hidden flex flex-col justify-between items-center relative font-poppins bg-black">
            <Head>
                <title>Zachraň žrádlo - Mailing List</title>
            </Head>
            <ToastContainer theme='colored'/>
            <div className="md:pt-10 w-full md:w-2/5 relative">
                <img
                    src='/meat.jpg'
                    className="animate-fade-in"
                />
            </div>
            <div className="p-8 flex justify-between items-center max-w-2xl flex-col animate-fade-in">
                <div className="w-full text-3xl text-center pb-6">
                    Nastavenie odberu noviniek
                </div>
                <Formik<FormValues>
                    onSubmit={handleManageAccount}
                    validationSchema={validationSchema}
                    initialValues={{
                        email: '',
                    }}
                    innerRef={formRef}
                >
                    {({touched, errors, values, setFieldValue}) => (
                        <Form>
                            <div className='flex flex-col items-center justify-center'>
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
                                    autocomplete="email"
                                    label={'Email'}
                                />
                                {touched.email && errors.email && (
                                    <div className="text-red-600 text-sm pt-2">{errors.email}</div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className='pt-4'>
                    <button className={btn} type="submit" onClick={onSubmit}>Spravovať
                    </button>
                </div>
            </div>
            <footer>
                <div className="w-full text-xl text-center pb-5">
                    <span className="p-4"><a href='https://github.com/Marpheus/food-saving'>Github</a></span>
                </div>
            </footer>
        </div>
    );
}