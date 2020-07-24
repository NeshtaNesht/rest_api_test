import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField as TextFieldFormik } from "formik-material-ui";

/**
 * Добавление/изменение постов
 * @param {bool} visibility Видимость окна
 * @param {func} onCloseModal Функция закрытия окна
 * @param {func} onSaveModal Функция сохранения
 * @param {object} data Объект для редактирования
 */
const AddPostModal = ({ visibility, onCloseModal, onSaveModal, data }) => {
  return (
    <div>
      <Dialog
        open={visibility}
        onClose={onCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Новый пост</DialogTitle>
        <Formik
          initialValues={{
            title: !!data ? data.title : "",
            user_id: !!data ? data.user_id : "",
            body: !!data ? data.body : "",
            id: !!data ? data.id : "",
          }}
          onSubmit={(values, { setSubmiting }) => {
            onSaveModal(values);
            onCloseModal();
          }}
          render={(props) => (
            <>
              <Form>
                <DialogContent>
                  <Field
                    name="title"
                    label="Заголовок"
                    fullWidth
                    component={TextFieldFormik}
                  />
                  <Field
                    name="user_id"
                    label="ID пользователя"
                    type="number"
                    fullWidth
                    component={TextFieldFormik}
                  />
                  <Field
                    name="body"
                    label="Текст поста"
                    multiline
                    rowsMax={10}
                    rows={5}
                    fullWidth
                    component={TextFieldFormik}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" type="submit">
                    Сохранить
                  </Button>
                  <Button onClick={onCloseModal}>Отмена</Button>
                </DialogActions>
              </Form>
            </>
          )}
        />
      </Dialog>
    </div>
  );
};

AddPostModal.propTypes = {
  visibility: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSaveModal: PropTypes.func,
  data: PropTypes.object,
};

export default AddPostModal;
