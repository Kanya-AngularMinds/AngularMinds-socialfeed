import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import HttpServices from "../Services/HttpServices";
import "../Styles/AddNewFilter.css";
function AddNewFilter() {
  const [buttonId, setButtonId] = useState("");
  const [open, setOpen] = useState(false);
  const [hideFields, setHideFields] = useState(true);
  const [belongToObject, setBelongToObject] = useState({});
  const [unique, setUnique] = useState("");
  const [selectField, setSelectField] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [d, setD] = useState("");

  const [rules, setRules] = useState([]);

  const [anyOfTheseRule, setAnyOfTheseRule] = useState([
    {
      condition: "",
      dataModel: "",
      type: "",
      field: "",
      displayTextList: [],
      fieldObject: {
        belongTo: "",
        companyId: "",
        data: [],
        displayText: "",
        isCustom: false,
        sequenceNo: "",
        showInDialog: false,
        index: "",
        type: "",
        value: "",
      },
      condition: "",
      index: "",
    },
  ]);

  let [filterObject, setFilterObject] = useState([
    {
      belongTo: "deal",
      name: "",
      rules: [],
    },
  ]);

  const postFilterObject = () => {
    let CombinedRules = [...rules, ...anyOfTheseRule];
    setFilterObject((prevState) => {
      let postObj = Object.assign({}, prevState.postObj);
      postObj.rules = CombinedRules;
      return { rules }; // return new object jasper object
    });
    setFilterObject(...filterObject, (filterObject.rules = CombinedRules));
    // const postFilter = {
    //   ...filterObject,
    //    postFilter.rules = CombinedRules,
    // };
    console.log("++++++++++++++", filterObject);
  };

  useEffect(() => {
    const getResponse = async () => {
      const response = await HttpServices.get(
        "/secure/getFieldsbyCompanyGroupedByBelongTo/620b6ddb28d58c704dba4944"
      );
      console.log(response.docs);
      setBelongToObject(response.docs);
    };
    getResponse();
    console.log("r", rules);
  }, []);

  useEffect(() => {
    let newArr = [...rules];
    console.log("rule updated");
    newArr.map(
      (n) =>
        (n.displayTextList = [
          "Name",
          "Address Line1",
          "Address Line 2",
          "City",
          "State",
          "Country",
          "Zipcode",
          "Ff",
          "Sss",
          "Ss",
        ])
    );
    setRules(newArr);
  }, [rules.length]);

  console.log(rules.length);
  const addNewConditionItem = (condition) => {
    setHideFields(false);
    setButtonId(condition);
    let newRule = {
      condition: "",
      dataModel: "",
      type: "",
      field: "",
      displayTextList: [],
      fieldObject: {
        condition: "",
        belongTo: "Deal",
        companyId: "",
        data: [],
        displayText: "",
        isCustom: false,
        sequenceNo: "",
        showInDialog: false,
        index: "",
        type: "",
        value: "",
      },
    };

    if (condition === "anyCondition") {
      setAnyOfTheseRule([...anyOfTheseRule, newRule]);
      //setRules([...rules, anyOfTheseRule, newRule]);
    }
    if (condition === "allCondition") {
      setRules([...rules, newRule]);
    }

    if (hideFields === false) {
      setFilterObject([...filterObject]);
    }
  };

  filterObject.map((add) => {
    add.rules = rules;
  });

  const handleOpenModal = async () => {
    setOpen(true);
    const belongToDeal = belongToObject.map((belong) => belong.belongTo);
    let unique = [...new Set(belongToDeal)];
    setUnique(unique);

    //setHideFields(false);
    // handleBelongTo(unique[0], 0);
  };

  const handleFilterName = (e) => {
    setFilterName(e.target.value);
    filterObject.map((add) => {
      add.name = e.target.value;
    });
  };

  const handleVisibility = (e) => {
    filterObject.map((add) => {
      add.visibile = e.target.value;
    });
  };

  const handleBelongTo = (e, index) => {
    console.log(index);
    const filteredDisplayText = belongToObject.filter((belong) => {
      return belong.belongTo === e.target.value;
    });
    console.log(" filtered Object", filteredDisplayText);
    let newRulesArray = [...rules];
    if (buttonId === "allCondition") {
      newRulesArray.map((add, i) => {
        if (i === index) {
          console.log(i);
          add.dataModel = e.target.value;
          add.fieldObject.belongTo = e.target.value;
          add.displayTextList = filteredDisplayText.map(
            (fil) => fil.displayText
          );
        }
      });
      newRulesArray.map((rul) => console.log(rul.displayTextList));

      setRules(newRulesArray);
      rules.map((rul) => {
        console.log("=============", rul.displayTextList);
      });
    } else {
      let newArray = [...anyOfTheseRule];
      newArray.map((an, i) => {
        if (i === index) {
          an.dataModel = e.target.value;
          an.displayTextList = filteredDisplayText.map(
            (fil) => fil.displayText
          );
        }
      });
      setAnyOfTheseRule(newArray);
    }

    setFilterObject(filterObject);
  };
  console.log("rules", rules);
  console.log("==============", filterObject);
  console.log(anyOfTheseRule);

  const handleDisplayText = (e, index) => {
    //setD(e.target.value);

    if (buttonId === "allCondition") {
      rules.map((add, i) => {
        if (i === index) {
          add.fieldObject.displayText = e.target.value;
          add.fieldObject.type = "text";
          add.type = "and";
          add.index = i;
        }
      });
      setRules(rules);
    } else {
      anyOfTheseRule.map((any, i) => {
        if (i === index) {
          any.fieldObject.displayText = e.target.value;
        }
      });
      setAnyOfTheseRule(anyOfTheseRule);
    }

    setFilterObject(filterObject);
  };

  const handleCondition = (e, index) => {
    if (buttonId === "allCondition") {
      rules.map((rule, i) => {
        if (i === index) {
          rule.condition = e.target.value;
          rule.fieldObject.condition = e.target.value;
        }
      });
    } else {
      anyOfTheseRule.map((any, i) => {
        if (i === index) {
          any.condition = e.target.value;
          any.fieldObject.condition = e.target.value;
        }
      });
    }
  };

  const handleText = (e, index) => {
    if (buttonId === "allCondition") {
      rules.map((rule, i) => {
        if (i === index) {
          rule.value = e.target.value;
        }
      });
    } else {
      anyOfTheseRule.map((any, i) => {
        if (i === index) {
          any.value = e.target.value;
        }
      });
    }
  };
  const removeRules = (index) => {
    if (buttonId === "allCondition") {
      rules.splice(index, 1);
      setRules([...rules]);
    } else {
      anyOfTheseRule.splice(index, 1);
      setAnyOfTheseRule([...anyOfTheseRule]);
    }
  };
  const closeModal = () => {
    setOpen(false);
  };
  // console.log("anyyyyy", anyOfTheseRule);
  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleOpenModal()}>
        Open Modal
      </button>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        contentClassName="modal-height"
        dialogClassName="my-modal"
      >
        <Modal.Header>
          <h3 style={{ color: "#2370eb" }}>Create new Filter</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label">Filter Name</label>
                <input
                  type="text"
                  className="form-control"
                  required=""
                  placeholder="Filter Name"
                  value={filterName}
                  onChange={(e) => handleFilterName(e)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-control-label">Visibility</label>
                <select
                  className="form-control"
                  name="visible"
                  required=""
                  onChange={(e) => handleVisibility(e)}
                >
                  <option value="" disabled="">
                    Select
                  </option>
                  <option value="private">Private</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="col-md-12">
            <div className="form-group">
              <label>
                {" "}
                <h5 style={{ fontWeight: "bold" }}>
                  Match All of these conditions
                </h5>
              </label>
            </div>

            {rules ? (
              rules.map((rule, index) => (
                <div
                  className="row"
                  key={index}
                  // style={{ display: setHideFields ? "none" : "block" }}
                >
                  <div className="col-md-2" key={index}>
                    <select
                      className="form-control"
                      onChange={(e) => handleBelongTo(e, index)}
                    >
                      {unique.length
                        ? unique.map((uniq, i) => {
                            return (
                              <option value={uniq} key={i}>
                                {uniq}
                              </option>
                            );
                          })
                        : console.log(null)}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-control"
                      defaultValue={unique[0]}
                      onChange={(e) => handleDisplayText(e, index)}
                    >
                      <option>Select field</option>
                      {rule.displayTextList?.map((selectField, i) => {
                        return (
                          <option value={selectField} key={i}>
                            {selectField}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-control"
                      onChange={(e) => handleCondition(e, index)}
                    >
                      <option value="$eq">is</option>
                      <option value="$ne">is not</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleText(e, index)}
                    />
                  </div>
                  <div className="col-md-2">
                    <span
                      className="pull-right text-muted"
                      style={{ paddingTop: "3px", cursor: "pointer" }}
                      onClick={() => removeRules(index)}
                    >
                      AND <i className="fa fa-minus-circle" />
                    </span>
                  </div>
                  <br />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <a
            style={{ color: "#2370eb", fontSize: "19px", cursor: "pointer" }}
            id="allCondition"
            className="allCondition"
            onClick={() => addNewConditionItem("allCondition")}
          >
            <i className="fa fa-plus-circle" />
            Add Condition
          </a>
          <div className="col-md-12">
            <div className="form-group">
              <label>
                {" "}
                <h5 style={{ fontWeight: "bold" }}>
                  Match ANY of these conditions
                </h5>
              </label>
            </div>

            {anyOfTheseRule ? (
              anyOfTheseRule.map((rule, index) => (
                <div className="row" key={index}>
                  <div className="col-md-2" key={index}>
                    <select
                      className="form-control"
                      onChange={(e) => handleBelongTo(e, index)}
                    >
                      {unique.length
                        ? unique.map((uniq, i) => {
                            return (
                              <option value={uniq} key={i}>
                                {uniq}
                              </option>
                            );
                          })
                        : console.log(null)}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-control"
                      onChange={(e) => handleDisplayText(e, index)}
                    >
                      <option>Select field</option>
                      {rule.displayTextList?.map((selectField, i) => {
                        return (
                          <option value={selectField} key={i}>
                            {selectField}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-control"
                      onChange={(e) => handleCondition(e, index)}
                    >
                      <option value="$eq">is</option>
                      <option value="$ne">is not</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleText(e, index)}
                    />
                  </div>
                  <div className="col-md-2">
                    <span
                      className="pull-right text-muted"
                      style={{ paddingTop: "3px", cursor: "pointer" }}
                      onClick={() => removeRules(index)}
                    >
                      OR <i className="fa fa-minus-circle" />
                    </span>
                  </div>
                  <br />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <a
            style={{ color: "#2370eb", fontSize: "19px", cursor: "pointer" }}
            id="anyCondition"
            className="anyCondition"
            onClick={() => addNewConditionItem("anyCondition")}
          >
            <i className="fa fa-plus-circle" />
            Add Condition
          </a>
          <br />
          <br />
          <br />
          <button
            className="btn btn-primary"
            style={{ width: "10%" }}
            onClick={() => postFilterObject()}
          >
            Save
          </button>{" "}
          &nbsp; &nbsp;
          <a href="#" onClick={closeModal}>
            Cancel
          </a>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddNewFilter;
