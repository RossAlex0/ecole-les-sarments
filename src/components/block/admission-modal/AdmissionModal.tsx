"use client";

import { Fragment } from "react";
import { MdFamilyRestroom, MdOutlineFolderShared } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Modal from "@/components/ui/modal/Modal";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { CONTACT_EMAIL, contactMailto } from "@/utils/contact/contact";
import "./admissionModal.css";

const steps = [
  {
    Icon: MdFamilyRestroom,
    title: "Entretien familial",
    description:
      "Rencontre avec la direction et l'enfant afin d'échanger autour du projet pédagogique et des attentes de chacun.",
  },
  {
    Icon: MdOutlineFolderShared,
    title: "Etude du dossier",
    description: "Chaque candidature est examinée avec attention par l'équipe pédagogique.",
  },
  {
    Icon: FaCheckCircle,
    title: "Validation",
    description:
      "Le dossier d'inscription est ensuite transmis par voie électronique aux familles retenues.",
  },
];

export type AdmissionModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdmissionModal({ open, onClose }: AdmissionModalProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="admission-modal-title" className="admission">
      <SarmentsText
        format="title"
        color="blue"
        id="admission-modal-title"
        className="admission_title"
      >
        Rejoindre l&apos;école des Sarments
      </SarmentsText>
      <SarmentsText format="semi-title-medium" color="blue" className="admission_subtitle">
        Procédure d&apos;admission
      </SarmentsText>

      <div className="admission_track" aria-hidden="true">
        {steps.map((_, i) => (
          <Fragment key={i}>
            <span className="admission_track_dot">{i + 1}</span>
            {i < steps.length - 1 && <span className="admission_track_line" />}
          </Fragment>
        ))}
      </div>

      <ol className="admission_steps">
        {steps.map(({ Icon, title, description }) => (
          <li key={title} className="admission_step">
            <Icon className="admission_step_icon" />
            <SarmentsText format="semi-title-medium" color="blue" className="admission_step_title">
              {title}
            </SarmentsText>
            <SarmentsText format="text" color="blue" className="admission_step_desc">
              {description}
            </SarmentsText>
          </li>
        ))}
      </ol>

      <div className="admission_banner">
        <div className="admission_banner_col">
          <SarmentsText format="semi-title-medium">Découvrir notre école</SarmentsText>
          <SarmentsText format="text" className="admission_banner_text">
            Nos journées portes ouvertes ont lieu chaque année entre février et mars.
          </SarmentsText>
        </div>

        <span className="admission_banner_divider" aria-hidden="true" />

        <div className="admission_banner_col">
          <SarmentsText format="semi-title-medium" className="admission_banner_email">
            {CONTACT_EMAIL}
          </SarmentsText>
          <SarmentsText format="text" className="admission_banner_text">
            Nous sommes à votre écoute pour toute question
          </SarmentsText>
        </div>

        <a className="admission_banner_btn" href={contactMailto()}>
          <CiMail className="admission_banner_btn_icon" />
          Nous contacter
        </a>
      </div>
    </Modal>
  );
}
