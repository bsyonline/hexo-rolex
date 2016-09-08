---
title: hbase shell 操作
toc: true
date: 2016-07-16 15:49:44
tags: hbase
categories: 编程
---


###COMMAND GROUPS:

	Group name: general
	Commands: status, version, whoami

	Group name: ddl
	Commands: alter, alter_async, alter_status, create, describe, disable, disable_all, drop, drop_all, enable, enable_all, exists, is_disabled, is_enabled, list, show_filters

	Group name: dml
	Commands: count, delete, deleteall, get, get_counter, incr, put, scan, truncate, truncate_preserve

	Group name: tools
	Commands: assign, balance_switch, balancer, close_region, compact, flush, hlog_roll, major_compact, move, split, unassign, zk_dump

	Group name: replication
	Commands: add_peer, disable_peer, enable_peer, list_peers, list_replicated_tables, remove_peer, start_replication, stop_replication

	Group name: snapshot
	Commands: clone_snapshot, delete_snapshot, list_snapshots, restore_snapshot, snapshot

	Group name: security
	Commands: grant, revoke, user_permission


###put : 循环插入记录

	hbase(main):061:0>for i in 'a'..'z' do for j in 'a'..'z' do put 't1', "row#{i}#{j}", "F:#{j}", "#{j}" end end

###alter : 修改表结构

	hbase(main):061:0>disable 't1'
	hbase(main):061:0>alter 't1',{NAME => 'F'}
	hbase(main):061:0>enable 't1'

###scan: 扫描前10条记录

	hbase(main):061:0>scan 't1', {LIMIT => 10}

###扫描F:a-F:c的记录

	hbase(main):061:0>scan 't1', {COLUMNS => ['F:a','F:c']}

###扫描行健范围
	scan 't1',{STARTROW => 'row-aa', STOPROW => 'row-az'}
