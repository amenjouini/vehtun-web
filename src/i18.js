import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from './local/EN.json';
import frJSON from './local/FR.json';
i18n.use(initReactI18next).init({
 resources: {   
    EN: { ...enJSON },
    FR: { ...frJSON},
}, // Where we're gonna put translations' files
 lng: "FR",     // Set the initial language of the App
});