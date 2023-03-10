import Image from "next/image";
import { FC, FormEvent, useCallback, useRef, useState } from "react";
import { useNotificationContext } from "../../context/notification.context";

export const EmailListModule: FC<{ onClose?: () => void, title: string, description: string, size: "small" | "medium" | "big" }> = ({ onClose, title, description, size }): JSX.Element => {

    const initialForm = { email: '', loading: false, sent: false, error: '' };
    const [form, setForm] = useState<{ email: string, loading: boolean, sent: boolean, error?: string }>(initialForm)
    const notificationContext = useNotificationContext();
    const emailRef = useRef(form.email);

    const close = useCallback(() => onClose && onClose(), [onClose]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        emailRef.current = form.email
        event.preventDefault();
        setForm({ ...form, loading: true });
        const data = await fetch(`/api/email?email=${form.email}`, { method: "GET" }).then(data => data.json());
        if (!data.email) {
            const response = await fetch(`/api/email`, {
                method: 'POST',
                body: JSON.stringify({ email: form.email }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const data = await response.json();
            if (data) {
                setForm({ ...initialForm, sent: true });
                close()
                notificationContext?.addNotification({ text: "Thank you, You will receive an email shortly", id: "1" })
            } else {
                setForm({ ...initialForm, sent: false });
                close()
                notificationContext?.addNotification({ text: "You have already signed up with this email", id: "2" })
            }
        } else {
            setForm({ ...initialForm, sent: false, error: `This email has already been used` });
        }
    }
    return (
        <>
            <div className={EmailsClasses.main} >
                <><h3 className={`${size === "small" ? "text-3xl" : size === "medium" ? "text-4xl" : "text-5xl"}`}>
                    {size !== "small" ? <><span className="text-accent-one">{title.split(' ').slice(0, 2).join(' ')}</span>
                        <br />
                        <span className="text-secondary-dark">{title.split(' ').slice(2).join(' ')}</span></> :
                        <span className="text-secondary-light">{title}</span>}
                </h3>
                    <p className={`${size === "small" ? "text-md" : size === "medium" ? "text-lg" : "text-xl"}`}>{description}</p>
                    <form onSubmit={event => handleSubmit(event)}>
                        <input
                            disabled={form.loading}
                            className={`${size === "small" ? "h-10" : "h-12"} w-full rounded pl-5 bg-secondary-light text-primary-text transition-all duration-500`}
                            placeholder="Email address"
                            value={form.email}
                            type="email"
                            onChange={event => setForm({ ...form, email: event?.target.value })}>
                        </input>
                        {form.error && <p className="text-accent-two py-2 text-center">{form.error}</p>}
                        <button disabled={form.email.length === 0 || form.loading} className={EmailsClasses.submitbutton(size)}>
                            <p>Submit</p>
                            {form.loading && <Image className="animate-spin" src="" alt="" height={20} width={20} />}
                        </button>
                    </form></>
            </div>
        </>
    )
}

export const EmailsClasses = {
    main: ` flex flex-col h-fit w-full gap-6`,
    submitbutton: (size: "big" | "medium" | "small") => ` ${size === "small" ? "h-10" : "h-12"} w-full bg-secondary-dark text-primary my-4 flex flex-row items-center justify-evenly`
}