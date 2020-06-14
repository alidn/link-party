package com.zas.linkparty.jdbcutil;

import java.sql.PreparedStatement;
import java.sql.SQLException;

@FunctionalInterface
public interface ParameterSetter {
    void setParameters(PreparedStatement preparedStatement) throws SQLException;
}
