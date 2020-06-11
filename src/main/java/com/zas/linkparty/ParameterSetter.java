package com.zas.linkparty;

import org.springframework.dao.DataAccessException;

import java.sql.PreparedStatement;
import java.sql.SQLException;

@FunctionalInterface
public interface ParameterSetter {
    void setParameters(PreparedStatement preparedStatement) throws SQLException;
}
